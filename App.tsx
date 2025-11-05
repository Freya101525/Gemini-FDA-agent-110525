
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { themes, flowerNames } from './constants';
import type { Theme, ThemeMode, Agent, FileData, AgentResult, OcrMethod } from './types';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import DocumentEditor from './components/DocumentEditor';
import DocumentAnalysis from './components/DocumentAnalysis';
import AgentRunner from './components/AgentRunner';
import FollowUpQuestions from './components/FollowUpQuestions';
import { processFile, getPageCount, parsePageSelection } from './services/fileProcessor';
import { runAgent as runAgentApi, generateFollowUpQuestions as generateFollowUpApi } from './services/geminiService';
import { LoaderCircle, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [themeName, setThemeName] = useState<string>('rose');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [ocrMethod, setOcrMethod] = useState<OcrMethod>('llm');
  
  const [files, setFiles] = useState<FileData[]>([]);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [combinedText, setCombinedText] = useState<string>("");
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'agent-1',
      name: 'Summarizer',
      prompt: 'Summarize the key findings and conclusions from the document in a concise, bulleted list.',
      provider: 'Gemini',
      model: 'gemini-2.5-flash',
      temperature: 0.3,
      maxTokens: 4096,
    },
    {
      id: 'agent-2',
      name: 'Data Extractor',
      prompt: 'Extract all specific data points, statistics, and measurements. Present them in a structured table format.',
      provider: 'Gemini',
      model: 'gemini-2.5-flash',
      temperature: 0.1,
      maxTokens: 4096,
    },
    {
      id: 'agent-3',
      name: 'Comparison Agent',
      prompt: 'Compare the findings in this document to standard industry practices or known benchmarks. Highlight any significant deviations or noteworthy consistencies.',
      provider: 'Gemini',
      model: 'gemini-2.5-pro',
      temperature: 0.5,
      maxTokens: 8192,
    }
  ]);
  const [agentResults, setAgentResults] = useState<Record<string, AgentResult>>({});
  const [isRunningAgents, setIsRunningAgents] = useState<boolean>(false);

  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    const theme: Theme = themes[themeName];
    const themeColors = theme[themeMode];

    let cssVars = '';
    for (const [key, value] of Object.entries(themeColors)) {
      cssVars += `--${key}: ${value};\n`;
    }
    document.getElementById('theme-vars')!.innerHTML = `:root {${cssVars}}`;
    
    root.classList.remove('light', 'dark');
    root.classList.add(themeMode);

    document.body.style.backgroundColor = themeColors['background-primary'];
    document.body.style.color = themeColors['text-primary'];

  }, [themeName, themeMode]);

  const handleFilesChange = async (newFiles: File[]) => {
    setFiles([]); // Clear old files
    setCombinedText("");
    setAgentResults({});
    setFollowUpQuestions([]);
    setProcessingError(null);
  
    const newFileDatas: FileData[] = newFiles.map(file => ({
      id: `${file.name}-${file.lastModified}`,
      file: file,
      status: file.type === 'application/pdf' ? 'getting_pages' : 'pending',
      content: '',
      totalPages: 0,
      pageSelection: ''
    }));
    setFiles(newFileDatas);
  
    // Fetch page counts for PDFs
    const pageCountPromises = newFileDatas.map(async (fileData) => {
      if (fileData.file.type === 'application/pdf') {
        try {
          const count = await getPageCount(fileData.file);
          return { 
            id: fileData.id, 
            totalPages: count, 
            pageSelection: `1-${Math.min(count, 5)}`, 
            status: 'pending' as FileData['status'], 
            content: '' 
          };
        } catch (e) {
          const message = e instanceof Error ? e.message : 'Could not read PDF metadata.';
          return { 
            id: fileData.id, 
            totalPages: 0, 
            status: 'error' as FileData['status'], 
            content: message,
            pageSelection: ''
          };
        }
      }
      return null;
    });
  
    const updates = (await Promise.all(pageCountPromises)).filter(Boolean);
    
    setFiles(currentFiles => currentFiles.map(f => {
      const update = updates.find(u => u && u.id === f.id);
      return update ? { ...f, ...update } : f;
    }));
  };
  
  const handleUpdateFile = (id: string, newValues: Partial<FileData>) => {
    setFiles(prev => prev.map(f => f.id === id ? {...f, ...newValues} : f));
  };

  const handleProcessFiles = useCallback(async () => {
    if (!process.env.API_KEY) {
      setProcessingError("API_KEY environment variable not set. Cannot perform OCR.");
      return;
    }

    setIsProcessing(true);
    setProcessingError(null);
    let updatedFiles = [...files];

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      for (let i = 0; i < updatedFiles.length; i++) {
        const fileData = updatedFiles[i];
        if (fileData.status === 'completed') continue;

        handleUpdateFile(fileData.id, { status: 'processing' });
        
        try {
          const pagesToProcess = fileData.file.type === 'application/pdf'
            ? parsePageSelection(fileData.pageSelection, fileData.totalPages)
            : undefined;

          const text = await processFile(fileData.file, ai, ocrMethod, pagesToProcess);
          handleUpdateFile(fileData.id, { content: text, status: 'completed' });
        } catch (error) {
          console.error('Error processing file:', fileData.file.name, error);
          const content = `Failed to process: ${error instanceof Error ? error.message : String(error)}`;
          handleUpdateFile(fileData.id, { status: 'error', content });
        }
      }
    } catch (e) {
      setProcessingError("An unexpected error occurred during file processing.");
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  }, [files, ocrMethod]);

  const handleCombineDocuments = () => {
    const allText = files
      .filter(f => f.status === 'completed' && f.content)
      .map(f => `--- DOCUMENT: ${f.file.name} ---\n\n${f.content}`)
      .join('\n\n\n');
    setCombinedText(allText);
  };

  const handleRunAgents = useCallback(async () => {
    setIsRunningAgents(true);
    setFollowUpQuestions([]);
    const results: Record<string, AgentResult> = {};
    let currentInput = combinedText;

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      for (const agent of agents) {
        setAgentResults(prev => ({...prev, [agent.id]: { status: 'running', output: ''}}))
        try {
          const output = await runAgentApi(ai, agent, currentInput);
          results[agent.id] = { status: 'completed', output };
          setAgentResults({...results});
          currentInput = output;
        } catch (error) {
           console.error(`Error running agent ${agent.name}:`, error);
           results[agent.id] = { status: 'error', output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
           setAgentResults({...results});
           throw new Error(`Agent ${agent.name} failed.`);
        }
      }

      setIsGeneratingQuestions(true);
      const questions = await generateFollowUpApi(ai, currentInput);
      setFollowUpQuestions(questions);

    } catch (e) {
      console.error("Agent execution failed:", e);
    } finally {
      setIsRunningAgents(false);
      setIsGeneratingQuestions(false);
    }
  }, [agents, combinedText]);
  
  const finalOutput = useMemo(() => {
    const lastAgent = agents[agents.length - 1];
    if (lastAgent && agentResults[lastAgent.id]?.status === 'completed') {
      return agentResults[lastAgent.id].output;
    }
    return null;
  }, [agents, agentResults]);

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgents(prev => prev.map(a => a.id === updatedAgent.id ? updatedAgent : a));
  };
  
  const showDocumentEditor = files.some(f => f.status === 'completed' || f.status === 'error') && !combinedText;
  const showAnalysisSection = !!combinedText;

  return (
    <div className="min-h-screen bg-[--background-primary] text-[--text-primary] font-sans transition-colors duration-300">
      <Header
        themeName={themeName}
        setThemeName={setThemeName}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        flowerNames={flowerNames}
      />
      <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[--text-title]">
            AI Document Analysis Studio
          </h1>
          <p className="mt-4 text-lg text-[--text-secondary]">
            Upload your documents, and let our multi-agent system extract, analyze, and compare insights for you.
          </p>
        </div>
        
        <FileUploader
          files={files}
          onFilesChange={handleFilesChange}
          onUpdateFile={handleUpdateFile}
          onProcess={handleProcessFiles}
          isProcessing={isProcessing}
          ocrMethod={ocrMethod}
          onOcrMethodChange={setOcrMethod}
        />

        {processingError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5" />
            <span>{processingError}</span>
          </div>
        )}

        {showDocumentEditor && (
            <DocumentEditor 
              files={files}
              onUpdateFileContent={(id, content) => handleUpdateFile(id, { content })}
              onCombine={handleCombineDocuments}
            />
        )}
        
        {showAnalysisSection && (
          <>
            <DocumentAnalysis 
              combinedText={combinedText} 
              onTextChange={setCombinedText}
            />
            <AgentRunner
              agents={agents}
              onUpdateAgent={handleUpdateAgent}
              onRunAgents={handleRunAgents}
              isRunning={isRunningAgents}
              results={agentResults}
            />
          </>
        )}

        {showAnalysisSection && (isGeneratingQuestions || followUpQuestions.length > 0) && (
          <FollowUpQuestions 
            questions={followUpQuestions} 
            isLoading={isGeneratingQuestions}
            finalOutput={finalOutput}
          />
        )}
      </main>
    </div>
  );
};

export default App;
