
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';

interface DocumentAnalysisProps {
  combinedText: string;
  onTextChange: (text: string) => void;
}

const DocumentAnalysis: React.FC<DocumentAnalysisProps> = ({ combinedText, onTextChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Step 3: Review Combined Document</CardTitle>
        <CardDescription>
          All document content has been combined into a single text block. You can make final edits here before running the analysis agents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <textarea
          value={combinedText}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full h-96 p-4 border border-[--card-border] rounded-md bg-[--background-secondary] text-[--text-primary] focus:ring-2 focus:ring-[--primary] focus:outline-none transition-colors"
          placeholder="Combined text from your documents will appear here..."
        />
      </CardContent>
    </Card>
  );
};

export default DocumentAnalysis;
