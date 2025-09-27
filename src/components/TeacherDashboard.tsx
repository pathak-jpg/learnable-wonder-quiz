import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Target, 
  BookOpen, 
  Award,
  BarChart3,
  Download
} from "lucide-react";

// Mock data for demonstration
const studentData = [
  {
    id: "1",
    name: "Alex Johnson",
    grade: 3,
    quizzesCompleted: 12,
    averageScore: 85,
    lastActivity: "2 hours ago",
    strengths: ["Math", "Science"],
    improvementAreas: ["Reading Comprehension"]
  },
  {
    id: "2", 
    name: "Sam Williams",
    grade: 2,
    quizzesCompleted: 8,
    averageScore: 92,
    lastActivity: "1 day ago",
    strengths: ["English", "General Knowledge"],
    improvementAreas: ["Math Operations"]
  },
  {
    id: "3",
    name: "Riley Chen",
    grade: 4,
    quizzesCompleted: 15,
    averageScore: 78,
    lastActivity: "3 hours ago", 
    strengths: ["Science", "Math"],
    improvementAreas: ["English Grammar"]
  }
];

const classOverview = {
  totalStudents: 25,
  activeToday: 18,
  averageScore: 82,
  totalQuizzes: 156,
  completionRate: 94
};

export const TeacherDashboard = () => {
  const handleExportData = () => {
    // In real app, this would export actual data
    alert("Student progress data exported successfully!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-xl text-muted-foreground mt-2">
              LearnAble VIS Analytics & Student Progress
            </p>
          </div>
          <Button onClick={handleExportData} variant="outline" size="lg">
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-foreground">{classOverview.totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Active Today</p>
                <p className="text-3xl font-bold text-success">{classOverview.activeToday}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Class Average</p>
                <p className="text-3xl font-bold text-primary">{classOverview.averageScore}%</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-accent">{classOverview.completionRate}%</p>
              </div>
              <Award className="w-8 h-8 text-accent" />
            </div>
          </Card>
        </div>

        {/* Class Performance Chart */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Class Performance Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Grade 1-2 (Ages 6-8)</span>
                  <span className="text-success font-bold">88%</span>
                </div>
                <Progress value={88} className="h-3" />
                <p className="text-sm text-muted-foreground">12 students</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Grade 3-4 (Ages 8-10)</span>
                  <span className="text-primary font-bold">82%</span>
                </div>
                <Progress value={82} className="h-3" />
                <p className="text-sm text-muted-foreground">8 students</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Grade 5 (Ages 10-11)</span>
                  <span className="text-warning font-bold">76%</span>
                </div>
                <Progress value={76} className="h-3" />
                <p className="text-sm text-muted-foreground">5 students</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Student Progress Table */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Individual Student Progress</h2>
            </div>

            <div className="space-y-4">
              {studentData.map((student) => (
                <div key={student.id} className="border-2 border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground">{student.name}</h3>
                      <p className="text-muted-foreground">Grade {student.grade} • Last active: {student.lastActivity}</p>
                    </div>
                    <Badge variant="secondary" className="text-lg py-2 px-4">
                      {student.averageScore}% Average
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="font-medium text-foreground mb-2">Quiz Activity</p>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{student.quizzesCompleted} quizzes completed</span>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-2">Strengths</p>
                      <div className="flex gap-2 flex-wrap">
                        {student.strengths.map((strength, index) => (
                          <Badge key={index} variant="default" className="bg-success text-success-foreground">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-2">Focus Areas</p>
                      <div className="flex gap-2 flex-wrap">
                        {student.improvementAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="border-warning text-warning">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{student.averageScore}%</span>
                    </div>
                    <Progress value={student.averageScore} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Accessibility Insights */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Accessibility Usage Insights</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="font-medium">Voice Input Usage</p>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">68% of students</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">High Contrast Mode</p>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">45% enabled</span>
                  <Badge variant="secondary">Popular</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Audio Guidance</p>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">92% usage rate</span>
                  <Badge className="bg-success text-success-foreground">Excellent</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};