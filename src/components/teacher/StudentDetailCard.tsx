import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentProfile } from "@/data/teacherMockData";
import { ChevronDown, ChevronUp, User, TrendingUp, Mic, Hand, Eye } from "lucide-react";
import { QuizAttemptDetail } from "./QuizAttemptDetail";
import { PerformanceTrendChart } from "./PerformanceTrendChart";
import { Progress } from "@/components/ui/progress";

interface StudentDetailCardProps {
  student: StudentProfile;
}

export const StudentDetailCard = ({ student }: StudentDetailCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden transition-all">
      <CardHeader className="cursor-pointer hover:bg-muted/30" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{student.name}</CardTitle>
              <CardDescription>
                Grade {student.grade} • {student.performanceMetrics.totalQuizzes} quizzes completed
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getPerformanceColor(student.performanceMetrics.averageScore)}>
              Avg: {student.performanceMetrics.averageScore}%
            </Badge>
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="quizzes">Quiz History</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${getPerformanceColor(student.performanceMetrics.averageScore)}`}>
                      {student.performanceMetrics.averageScore}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Improvement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-success flex items-center gap-2">
                      <TrendingUp className="w-6 h-6" />
                      +{student.performanceMetrics.improvementRate}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {student.performanceMetrics.totalQuizzes}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Strong Subjects</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {student.performanceMetrics.strongSubjects.map(subject => (
                      <Badge key={subject} variant="default" className="capitalize">
                        {subject}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {student.performanceMetrics.weakSubjects.length > 0 ? (
                      student.performanceMetrics.weakSubjects.map(subject => (
                        <Badge key={subject} variant="secondary" className="capitalize">
                          {subject}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No weak areas identified</span>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4">
              {student.quizAttempts.map((attempt, idx) => (
                <div key={attempt.id}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Quiz #{student.quizAttempts.length - idx}</h4>
                    <span className="text-sm text-muted-foreground">{formatDate(attempt.date)}</span>
                  </div>
                  <QuizAttemptDetail attempt={attempt} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="trends">
              <PerformanceTrendChart student={student} />
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Input Mode Usage</CardTitle>
                  <CardDescription>How the student prefers to interact with quizzes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Voice Input</span>
                      </div>
                      <span className="text-sm font-bold">{student.accessibilityPreferences.voiceInputUsage}%</span>
                    </div>
                    <Progress value={student.accessibilityPreferences.voiceInputUsage} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Hand className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium">Touch Input</span>
                      </div>
                      <span className="text-sm font-bold">{100 - student.accessibilityPreferences.voiceInputUsage}%</span>
                    </div>
                    <Progress value={100 - student.accessibilityPreferences.voiceInputUsage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Accessibility Features</CardTitle>
                  <CardDescription>Features enabled and usage patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">High Contrast Mode</span>
                    </div>
                    <Badge variant={student.accessibilityPreferences.highContrastEnabled ? "default" : "secondary"}>
                      {student.accessibilityPreferences.highContrastEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Audio Guidance Usage</span>
                      <span className="text-sm font-bold">{student.accessibilityPreferences.audioGuidanceUsage}%</span>
                    </div>
                    <Progress value={student.accessibilityPreferences.audioGuidanceUsage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};