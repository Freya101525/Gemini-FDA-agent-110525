
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import { LoaderCircle, MessageSquareQuote } from 'lucide-react';

interface FollowUpQuestionsProps {
  questions: string[];
  isLoading: boolean;
  finalOutput: string | null;
}

const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = ({ questions, isLoading, finalOutput }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Step 5: Next Steps & Follow-up</CardTitle>
        <CardDescription>
          Based on the complete analysis, here are some suggested follow-up questions to explore further.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center gap-3 text-[--text-secondary] p-6">
            <LoaderCircle className="animate-spin h-6 w-6 text-[--primary]" />
            <span className="text-lg">Generating insightful questions...</span>
          </div>
        )}
        {!isLoading && questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-[--background-secondary] rounded-lg">
                <MessageSquareQuote className="h-5 w-5 text-[--accent] mt-1 flex-shrink-0" />
                <p className="text-[--text-primary]">{q}</p>
              </div>
            ))}
          </div>
        )}
        {!isLoading && questions.length === 0 && finalOutput && (
            <p className="text-center text-[--text-secondary]">No follow-up questions were generated.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowUpQuestions;
