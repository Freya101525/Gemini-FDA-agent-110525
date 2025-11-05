
import React, { useState } from 'react';
import type { Agent, AgentResult } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import { ChevronDown, LoaderCircle, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface AgentRunnerProps {
  agents: Agent[];
  onUpdateAgent: (agent: Agent) => void;
  onRunAgents: () => void;
  isRunning: boolean;
  results: Record<string, AgentResult>;
}

const AgentCard: React.FC<{
  agent: Agent;
  onUpdateAgent: (agent: Agent) => void;
  result?: AgentResult;
  isExpanded: boolean;
  onToggle: () => void;
  isProcessing: boolean;
}> = ({ agent, onUpdateAgent, result, isExpanded, onToggle, isProcessing }) => {

  const handleFieldChange = (field: keyof Agent, value: any) => {
    onUpdateAgent({ ...agent, [field]: value });
  };

  const StatusIndicator = () => {
    if (!result) return null;
    switch(result.status) {
      case 'running': return <LoaderCircle className="h-5 w-5 animate-spin text-[--accent]" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[--background-primary]" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <StatusIndicator />
          <h4 className="font-semibold text-[--text-title]">{agent.name}</h4>
        </div>
        <ChevronDown className={`w-5 h-5 text-[--text-secondary] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      {isExpanded && (
        <div className="p-4 border-t border-[--card-border] space-y-4">
          <div>
            <label className="text-sm font-medium text-[--text-secondary]">Prompt</label>
            <textarea
              value={agent.prompt}
              onChange={(e) => handleFieldChange('prompt', e.target.value)}
              disabled={isProcessing}
              className="mt-1 w-full h-32 p-2 border border-[--card-border] rounded-md bg-[--background-secondary] text-[--text-primary] focus:ring-1 focus:ring-[--primary] focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[--text-secondary]">Model</label>
              <select 
                value={agent.model}
                onChange={(e) => handleFieldChange('model', e.target.value)}
                disabled={isProcessing}
                className="mt-1 w-full p-2 border border-[--card-border] rounded-md bg-[--background-secondary] text-[--text-primary] focus:ring-1 focus:ring-[--primary] focus:outline-none">
                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[--text-secondary]">Temperature: {agent.temperature.toFixed(2)}</label>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={agent.temperature}
                onChange={(e) => handleFieldChange('temperature', parseFloat(e.target.value))}
                disabled={isProcessing}
                className="mt-1 w-full h-2 bg-[--background-secondary] rounded-lg appearance-none cursor-pointer accent-[--primary]"
              />
            </div>
          </div>
        </div>
      )}
      {result && result.output && (
        <div className="p-4 border-t border-[--card-border] bg-[--background-secondary]">
          <h5 className="font-semibold text-[--text-primary]">Result:</h5>
          <div className={`mt-2 p-3 rounded-md text-sm ${result.status === 'error' ? 'bg-red-500/10 text-red-300' : 'bg-[--background-primary] text-[--text-secondary]'}`}>
            <pre className="whitespace-pre-wrap font-sans">{result.output}</pre>
          </div>
        </div>
      )}
    </Card>
  )
};

const AgentRunner: React.FC<AgentRunnerProps> = ({ agents, onUpdateAgent, onRunAgents, isRunning, results }) => {
  const [expandedAgentId, setExpandedAgentId] = useState<string | null>(agents[0]?.id || null);

  const toggleAgent = (id: string) => {
    setExpandedAgentId(expandedAgentId === id ? null : id);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Step 4: Configure & Run AI Agents</CardTitle>
        <CardDescription>
          A sequence of specialized AI agents will analyze your document. The output of one agent becomes the input for the next.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {agents.map((agent, index) => (
            <React.Fragment key={agent.id}>
              <AgentCard 
                agent={agent} 
                onUpdateAgent={onUpdateAgent}
                result={results[agent.id]}
                isExpanded={expandedAgentId === agent.id}
                onToggle={() => toggleAgent(agent.id)}
                isProcessing={isRunning}
              />
              {index < agents.length - 1 && (
                 <div className="flex justify-center">
                   <ChevronDown className="h-6 w-6 text-[--card-border]" />
                 </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <Button onClick={onRunAgents} disabled={isRunning} className="w-full gap-2">
          {isRunning ? (
            <>
              <LoaderCircle className="animate-spin h-5 w-5" /> Running Agent Pipeline...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" /> Run All Agents
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentRunner;
