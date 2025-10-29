import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { teacherMockData } from "@/data/teacherMockData";

export const ClassAnalytics = () => {
  // Grade distribution
  const gradeData = [1, 2, 3, 4, 5].map(grade => ({
    grade: `Grade ${grade}`,
    students: teacherMockData.filter(s => s.grade === grade).length,
    avgScore: Math.round(
      teacherMockData
        .filter(s => s.grade === grade)
        .reduce((sum, s) => sum + s.performanceMetrics.averageScore, 0) /
      teacherMockData.filter(s => s.grade === grade).length || 0
    )
  }));

  // Subject performance across all students
  const subjects = ['math', 'english', 'science', 'general'];
  const subjectData = subjects.map(subject => {
    const allQuestions = teacherMockData.flatMap(s =>
      s.quizAttempts.flatMap(a => a.questions.filter(q => q.subject === subject))
    );
    const correctCount = allQuestions.filter(q => q.isCorrect).length;
    const totalCount = allQuestions.length;
    return {
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      successRate: totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0
    };
  });

  // Input mode preference
  const voiceCount = teacherMockData.filter(s => s.accessibilityPreferences.voiceInputUsage > 50).length;
  const touchCount = teacherMockData.length - voiceCount;
  const inputModeData = [
    { name: 'Voice Preferred', value: voiceCount, color: 'hsl(var(--primary))' },
    { name: 'Touch Preferred', value: touchCount, color: 'hsl(var(--secondary))' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance by Grade Level</CardTitle>
          <CardDescription>Average scores across different grades</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="grade" stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="avgScore" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subject Success Rate</CardTitle>
          <CardDescription>Percentage of correct answers by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="successRate" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input Mode Preferences</CardTitle>
          <CardDescription>How students prefer to answer questions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inputModeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {inputModeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Enrollment</CardTitle>
          <CardDescription>Number of students per grade</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="grade" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="students" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};