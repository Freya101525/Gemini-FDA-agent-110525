
import React, { useCallback, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import type { FileData, OcrMethod } from '../types';
import { UploadCloud, FileText, X, LoaderCircle, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface FileUploaderProps {
  files: FileData[];
  onFilesChange: (files: File[]) => void;
  onUpdateFile: (id: string, newValues: Partial<FileData>) => void;
  onProcess: () => void;
  isProcessing: boolean;
  ocrMethod: OcrMethod;
  onOcrMethodChange: (method: OcrMethod) => void;
}

const FileItem: React.FC<{
  fileData: FileData;
  onRemove: (id: string) => void;
  onUpdate: (id: string, newValues: Partial<FileData>) => void;
  isProcessing: boolean;
}> = ({ fileData, onRemove, onUpdate, isProcessing }) => {
  const { id, file, status, totalPages, pageSelection, content } = fileData;

  const FileStatusIcon = () => {
    switch (status) {
      case 'getting_pages':
      case 'processing': return <LoaderCircle className="h-5 w-5 animate-spin text-[--accent]" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <FileText className="h-5 w-5 text-[--text-secondary]" />;
    }
  };

  return (
    <li className="p-3 bg-[--background-secondary] rounded-md space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <FileStatusIcon />
          <span className="text-sm font-medium text-[--text-primary] truncate" title={file.name}>{file.name}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-[--text-secondary]">{(file.size / 1024).toFixed(2)} KB</span>
          <button 
            onClick={() => onRemove(id)}
            className="p-1 text-[--text-secondary] hover:text-[--text-primary] rounded-full hover:bg-[--background-primary]"
            aria-label="Remove file"
            disabled={isProcessing}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {file.type === 'application/pdf' && status !== 'getting_pages' && (
        <div className="flex items-center gap-3 pl-8">
          <label htmlFor={`pages-${id}`} className="text-sm text-[--text-secondary] whitespace-nowrap">Pages:</label>
          <input
            type="text"
            id={`pages-${id}`}
            value={pageSelection}
            onChange={(e) => onUpdate(id, { pageSelection: e.target.value })}
            placeholder="e.g., 1-5, 8"
            disabled={isProcessing}
            className="w-full px-2 py-1 text-sm border border-[--card-border] rounded-md bg-[--background-primary] text-[--text-primary] focus:ring-1 focus:ring-[--primary] focus:outline-none"
          />
          <span className="text-sm text-[--text-secondary] whitespace-nowrap">of {totalPages}</span>
        </div>
      )}
       {status === 'error' && <p className="text-xs text-red-400 pl-8">{content}</p>}
    </li>
  );
};


const FileUploader: React.FC<FileUploaderProps> = ({ files, onFilesChange, onUpdateFile, onProcess, isProcessing, ocrMethod, onOcrMethodChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesChange(Array.from(e.target.files));
    }
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesChange(Array.from(e.dataTransfer.files));
    }
  }, [onFilesChange]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  
  const handleRemoveFile = (idToRemove: string) => {
    const newFiles = files.filter(f => f.id !== idToRemove).map(fd => fd.file);
    onFilesChange(newFiles);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Step 1: Upload & Process Documents</CardTitle>
        <CardDescription>Select files, specify pages for PDFs, and process them to extract text.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
            ${isDragging ? 'border-[--primary] bg-[--primary]/10' : 'border-[--card-border] bg-[--background-secondary] hover:bg-[--background-primary]'}`}
        >
          <UploadCloud className="w-12 h-12 text-[--accent]" />
          <p className="mt-4 text-lg text-[--text-secondary]">Drag & Drop files here</p>
          <p className="text-sm text-[--text-secondary]">or</p>
          <Button variant="secondary" className="mt-2" onClick={() => document.getElementById('file-input')?.click()}>
            Browse Files
          </Button>
          <input id="file-input" type="file" multiple accept=".pdf,.txt" onChange={handleFileChange} className="hidden" />
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
             <div>
              <h4 className="font-medium text-[--text-primary] mb-2">PDF Processing Method</h4>
               <div className="flex space-x-2 rounded-lg bg-[--background-secondary] p-1">
                <button
                  onClick={() => onOcrMethodChange('llm')}
                  className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${ ocrMethod === 'llm' ? 'bg-[--primary] text-[--text-on-primary] shadow-sm' : 'text-[--text-secondary] hover:bg-[--background-primary]' }`} >
                  LLM-based OCR
                </button>
                <button
                  onClick={() => onOcrMethodChange('direct')}
                  className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${ ocrMethod === 'direct' ? 'bg-[--primary] text-[--text-on-primary] shadow-sm' : 'text-[--text-secondary] hover:bg-[--background-primary]' }`} >
                  Direct Extraction
                </button>
              </div>
              <p className="text-xs text-[--text-secondary] mt-2 px-1">
                Use <strong>LLM OCR</strong> for scanned PDFs (supports English & Traditional Chinese). Use <strong>Direct Extraction</strong> for faster processing of text-based PDFs.
              </p>
            </div>
            
            <h4 className="font-medium text-[--text-primary] pt-2">File Queue:</h4>
            <ul className="space-y-2">
              {files.map((fileData) => (
                <FileItem key={fileData.id} fileData={fileData} onRemove={handleRemoveFile} onUpdate={onUpdateFile} isProcessing={isProcessing} />
              ))}
            </ul>
            <Button onClick={onProcess} disabled={isProcessing || files.length === 0} className="w-full mt-4 gap-2">
              {isProcessing ? (
                <> <LoaderCircle className="animate-spin h-5 w-5" /> Processing... </>
              ) : (
                <> <RefreshCw className="h-5 w-5" /> Process Files & Extract Text </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploader;
