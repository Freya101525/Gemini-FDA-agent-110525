
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import Button from './ui/Button';
import type { FileData } from '../types';
import { FileText, Combine } from 'lucide-react';

interface DocumentEditorProps {
  files: FileData[];
  onUpdateFileContent: (id: string, newContent: string) => void;
  onCombine: () => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ files, onUpdateFileContent, onCombine }) => {
  const processedFiles = files.filter(f => f.status === 'completed' || f.status === 'error');

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Step 2: Review & Edit Extracted Text</CardTitle>
        <CardDescription>
          The text from each document is shown below. You can edit the content before combining them for the final analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {processedFiles.map(fileData => (
            <div key={fileData.id}>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-[--accent]" />
                <h4 className="font-medium text-[--text-primary]">{fileData.file.name}</h4>
              </div>
              <textarea
                value={fileData.content}
                onChange={(e) => onUpdateFileContent(fileData.id, e.target.value)}
                disabled={fileData.status === 'error'}
                className={`w-full h-48 p-3 border rounded-md bg-[--background-secondary] text-[--text-primary] focus:ring-2 focus:ring-[--primary] focus:outline-none transition-colors ${
                  fileData.status === 'error' ? 'border-red-500/30 text-red-400' : 'border-[--card-border]'
                }`}
              />
            </div>
          ))}
        </div>
        <Button onClick={onCombine} className="w-full gap-2">
          <Combine className="h-5 w-5" />
          Combine All Documents for Analysis
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentEditor;
