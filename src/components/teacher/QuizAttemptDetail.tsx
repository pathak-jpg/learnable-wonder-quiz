import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizAttempt } from "@/data/teacherMockData";
import { CheckCircle2, XCircle, Mic, Hand, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface QuizAttemptDetailProps {
  attempt: QuizAttempt;
}

export const QuizAttemptDetail = ({ attempt }: QuizAttemptDetailProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Quiz Details</CardTitle>
            <CardDescription>
              {formatDate(attempt.date)} • Grade {attempt.gradeLevel}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={attempt.score >= 80 ? "default" : attempt.score >= 60 ? "secondary" : "destructive"}>
              Score: {attempt.score}%
            </Badge>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(attempt.duration)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Student Answer</TableHead>
                <TableHead>Correct Answer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempt.questions.map((q, idx) => (
                <TableRow key={q.questionId} className={q.isCorrect ? "bg-success/5" : "bg-destructive/5"}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="font-medium mb-1">{q.questionText}</div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      {q.options.map((opt, i) => (
                        <div key={i}>• {opt}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {q.subject}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={!q.isCorrect ? "text-destructive font-medium" : ""}>
                      {typeof q.studentAnswer === 'number' ? q.options[q.studentAnswer] : q.studentAnswer}
                    </span>
                  </TableCell>
                  <TableCell className="text-success font-medium">
                    {q.options[q.correctAnswer]}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatTime(q.timeSpent)}
                  </TableCell>
                  <TableCell>
                    {q.inputMode === 'voice' ? (
                      <Mic className="w-4 h-4 text-primary" />
                    ) : (
                      <Hand className="w-4 h-4 text-secondary" />
                    )}
                  </TableCell>
                  <TableCell>
                    {q.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};