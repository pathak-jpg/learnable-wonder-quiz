import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Award, Activity, Download } from "lucide-react";
import { teacherMockData, getClassOverview } from "@/data/teacherMockData";
import { StudentDetailCard } from "./teacher/StudentDetailCard";
import { ClassAnalytics } from "./teacher/ClassAnalytics";
import { FilterPanel } from "./teacher/FilterPanel";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TeacherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  
  const classOverview = getClassOverview();

  const filteredStudents = teacherMockData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === "all" || student.grade === parseInt(gradeFilter);
    
    let matchesPerformance = true;
    if (performanceFilter === "excellent") {
      matchesPerformance = student.performanceMetrics.averageScore >= 90;
    } else if (performanceFilter === "good") {
      matchesPerformance = student.performanceMetrics.averageScore >= 70 && student.performanceMetrics.averageScore < 90;
    } else if (performanceFilter === "needs-improvement") {
      matchesPerformance = student.performanceMetrics.averageScore < 70;
    }
    
    return matchesSearch && matchesGrade && matchesPerformance;
  });

  const handleExportData = () => {
    toast.success("Data export started! Preparing comprehensive report...");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor student progress and accessibility insights
            </p>
          </div>
          <Button onClick={handleExportData} size="lg" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classOverview.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Across all grades
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classOverview.activeToday}</div>
              <p className="text-xs text-muted-foreground">
                Students who took quizzes today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classOverview.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Class-wide performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classOverview.completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                Of assigned quizzes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students">Individual Students</TabsTrigger>
            <TabsTrigger value="analytics">Class Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6 mt-6">
            {/* Filters */}
            <FilterPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              gradeFilter={gradeFilter}
              onGradeFilterChange={setGradeFilter}
              performanceFilter={performanceFilter}
              onPerformanceFilterChange={setPerformanceFilter}
            />

            {/* Student Cards */}
            <div className="space-y-4">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <StudentDetailCard key={student.id} student={student} />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No students found matching your filters.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <ClassAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};