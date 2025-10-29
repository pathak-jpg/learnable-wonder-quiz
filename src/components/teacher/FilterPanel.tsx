import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  gradeFilter: string;
  onGradeFilterChange: (value: string) => void;
  performanceFilter: string;
  onPerformanceFilterChange: (value: string) => void;
}

export const FilterPanel = ({
  searchQuery,
  onSearchChange,
  gradeFilter,
  onGradeFilterChange,
  performanceFilter,
  onPerformanceFilterChange
}: FilterPanelProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search students by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={gradeFilter} onValueChange={onGradeFilterChange}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Filter by Grade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Grades</SelectItem>
          <SelectItem value="1">Grade 1</SelectItem>
          <SelectItem value="2">Grade 2</SelectItem>
          <SelectItem value="3">Grade 3</SelectItem>
          <SelectItem value="4">Grade 4</SelectItem>
          <SelectItem value="5">Grade 5</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={performanceFilter} onValueChange={onPerformanceFilterChange}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Filter by Performance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Performance</SelectItem>
          <SelectItem value="excellent">Excellent (90-100%)</SelectItem>
          <SelectItem value="good">Good (70-89%)</SelectItem>
          <SelectItem value="needs-improvement">Needs Improvement (&lt;70%)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};