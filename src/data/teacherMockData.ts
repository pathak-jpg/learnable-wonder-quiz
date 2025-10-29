export interface QuestionResult {
  questionId: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  studentAnswer: number | string;
  isCorrect: boolean;
  timeSpent: number;
  inputMode: 'voice' | 'touch';
  subject: 'math' | 'english' | 'science' | 'general';
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  date: string;
  gradeLevel: 1 | 2 | 3 | 4 | 5;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  duration: number;
  questions: QuestionResult[];
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: number;
  quizAttempts: QuizAttempt[];
  accessibilityPreferences: {
    voiceInputUsage: number;
    highContrastEnabled: boolean;
    audioGuidanceUsage: number;
  };
  performanceMetrics: {
    averageScore: number;
    totalQuizzes: number;
    improvementRate: number;
    strongSubjects: string[];
    weakSubjects: string[];
  };
}

export const teacherMockData: StudentProfile[] = [
  {
    id: "s1",
    name: "Emma Johnson",
    grade: 3,
    accessibilityPreferences: {
      voiceInputUsage: 85,
      highContrastEnabled: true,
      audioGuidanceUsage: 95
    },
    performanceMetrics: {
      averageScore: 88,
      totalQuizzes: 12,
      improvementRate: 15,
      strongSubjects: ["math", "science"],
      weakSubjects: ["english"]
    },
    quizAttempts: [
      {
        id: "q1",
        studentId: "s1",
        date: "2025-10-25T10:30:00",
        gradeLevel: 3,
        score: 90,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 180,
        questions: [
          {
            questionId: "q3_1",
            questionText: "What is 15 + 8?",
            options: ["21", "22", "23", "24"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 25,
            inputMode: "voice",
            subject: "math"
          },
          {
            questionId: "q3_2",
            questionText: "Which is the correct spelling?",
            options: ["Freind", "Friend", "Frend", "Friand"],
            correctAnswer: 1,
            studentAnswer: 0,
            isCorrect: false,
            timeSpent: 42,
            inputMode: "touch",
            subject: "english"
          },
          {
            questionId: "q3_3",
            questionText: "What do plants need to grow?",
            options: ["Only water", "Only sunlight", "Water, sunlight and air", "Only air"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 35,
            inputMode: "voice",
            subject: "science"
          },
          {
            questionId: "q3_4",
            questionText: "What is 7 × 4?",
            options: ["24", "26", "28", "30"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 30,
            inputMode: "voice",
            subject: "math"
          },
          {
            questionId: "q3_5",
            questionText: "Which word is a noun?",
            options: ["Run", "Happy", "Book", "Quickly"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 48,
            inputMode: "touch",
            subject: "english"
          }
        ]
      },
      {
        id: "q2",
        studentId: "s1",
        date: "2025-10-22T14:15:00",
        gradeLevel: 3,
        score: 85,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 195,
        questions: [
          {
            questionId: "q3_6",
            questionText: "What is 25 - 9?",
            options: ["14", "15", "16", "17"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 28,
            inputMode: "voice",
            subject: "math"
          },
          {
            questionId: "q3_7",
            questionText: "What is water made of?",
            options: ["Hydrogen only", "Oxygen only", "Hydrogen and Oxygen", "Carbon"],
            correctAnswer: 2,
            studentAnswer: 1,
            isCorrect: false,
            timeSpent: 55,
            inputMode: "touch",
            subject: "science"
          },
          {
            questionId: "q3_8",
            questionText: "Which is a verb?",
            options: ["Table", "Jump", "Blue", "Cat"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 38,
            inputMode: "voice",
            subject: "english"
          },
          {
            questionId: "q3_9",
            questionText: "What is 12 ÷ 3?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 32,
            inputMode: "voice",
            subject: "math"
          },
          {
            questionId: "q3_10",
            questionText: "What do we call baby frogs?",
            options: ["Pups", "Kittens", "Tadpoles", "Chicks"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 42,
            inputMode: "touch",
            subject: "science"
          }
        ]
      }
    ]
  },
  {
    id: "s2",
    name: "Liam Chen",
    grade: 2,
    accessibilityPreferences: {
      voiceInputUsage: 60,
      highContrastEnabled: false,
      audioGuidanceUsage: 75
    },
    performanceMetrics: {
      averageScore: 92,
      totalQuizzes: 15,
      improvementRate: 8,
      strongSubjects: ["math", "general"],
      weakSubjects: ["science"]
    },
    quizAttempts: [
      {
        id: "q3",
        studentId: "s2",
        date: "2025-10-26T09:00:00",
        gradeLevel: 2,
        score: 95,
        totalQuestions: 5,
        correctAnswers: 5,
        duration: 150,
        questions: [
          {
            questionId: "q2_1",
            questionText: "What is 5 + 3?",
            options: ["6", "7", "8", "9"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 20,
            inputMode: "touch",
            subject: "math"
          },
          {
            questionId: "q2_2",
            questionText: "Which animal says 'Meow'?",
            options: ["Dog", "Cat", "Cow", "Duck"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 18,
            inputMode: "voice",
            subject: "general"
          },
          {
            questionId: "q2_3",
            questionText: "What color is the sky?",
            options: ["Green", "Blue", "Red", "Yellow"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 15,
            inputMode: "touch",
            subject: "general"
          },
          {
            questionId: "q2_4",
            questionText: "What is 10 - 4?",
            options: ["5", "6", "7", "8"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 22,
            inputMode: "touch",
            subject: "math"
          },
          {
            questionId: "q2_5",
            questionText: "How many legs does a spider have?",
            options: ["6", "8", "10", "12"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 25,
            inputMode: "voice",
            subject: "science"
          }
        ]
      }
    ]
  },
  {
    id: "s3",
    name: "Sophia Martinez",
    grade: 4,
    accessibilityPreferences: {
      voiceInputUsage: 95,
      highContrastEnabled: true,
      audioGuidanceUsage: 100
    },
    performanceMetrics: {
      averageScore: 78,
      totalQuizzes: 10,
      improvementRate: 22,
      strongSubjects: ["english"],
      weakSubjects: ["math", "science"]
    },
    quizAttempts: [
      {
        id: "q4",
        studentId: "s3",
        date: "2025-10-24T11:00:00",
        gradeLevel: 4,
        score: 75,
        totalQuestions: 5,
        correctAnswers: 3,
        duration: 220,
        questions: [
          {
            questionId: "q4_1",
            questionText: "What is 18 × 5?",
            options: ["80", "85", "90", "95"],
            correctAnswer: 2,
            studentAnswer: 1,
            isCorrect: false,
            timeSpent: 58,
            inputMode: "voice",
            subject: "math"
          },
          {
            questionId: "q4_2",
            questionText: "Which is the correct past tense of 'run'?",
            options: ["Runned", "Ran", "Runed", "Running"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 35,
            inputMode: "voice",
            subject: "english"
          },
          {
            questionId: "q4_3",
            questionText: "What is the largest planet in our solar system?",
            options: ["Mars", "Earth", "Jupiter", "Saturn"],
            correctAnswer: 2,
            studentAnswer: 3,
            isCorrect: false,
            timeSpent: 48,
            inputMode: "voice",
            subject: "science"
          },
          {
            questionId: "q4_4",
            questionText: "Which word is an adjective?",
            options: ["Quickly", "Beautiful", "Jump", "Teacher"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 42,
            inputMode: "voice",
            subject: "english"
          },
          {
            questionId: "q4_5",
            questionText: "What is 144 ÷ 12?",
            options: ["10", "11", "12", "13"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 37,
            inputMode: "voice",
            subject: "math"
          }
        ]
      }
    ]
  },
  {
    id: "s4",
    name: "Noah Patel",
    grade: 5,
    accessibilityPreferences: {
      voiceInputUsage: 45,
      highContrastEnabled: false,
      audioGuidanceUsage: 50
    },
    performanceMetrics: {
      averageScore: 95,
      totalQuizzes: 18,
      improvementRate: 5,
      strongSubjects: ["math", "science", "english"],
      weakSubjects: []
    },
    quizAttempts: [
      {
        id: "q5",
        studentId: "s4",
        date: "2025-10-27T13:30:00",
        gradeLevel: 5,
        score: 100,
        totalQuestions: 5,
        correctAnswers: 5,
        duration: 140,
        questions: [
          {
            questionId: "q5_1",
            questionText: "What is 15% of 200?",
            options: ["25", "30", "35", "40"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 32,
            inputMode: "touch",
            subject: "math"
          },
          {
            questionId: "q5_2",
            questionText: "What is the process by which plants make food?",
            options: ["Respiration", "Photosynthesis", "Digestion", "Absorption"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 28,
            inputMode: "touch",
            subject: "science"
          },
          {
            questionId: "q5_3",
            questionText: "Which is a compound sentence?",
            options: ["I like apples.", "I like apples and oranges.", "I like apples, but I love oranges.", "Apples are red."],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 38,
            inputMode: "touch",
            subject: "english"
          },
          {
            questionId: "q5_4",
            questionText: "What is the square root of 144?",
            options: ["10", "11", "12", "13"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 22,
            inputMode: "touch",
            subject: "math"
          },
          {
            questionId: "q5_5",
            questionText: "What is the freezing point of water in Celsius?",
            options: ["-10°C", "0°C", "10°C", "100°C"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 20,
            inputMode: "touch",
            subject: "science"
          }
        ]
      }
    ]
  },
  {
    id: "s5",
    name: "Ava Williams",
    grade: 1,
    accessibilityPreferences: {
      voiceInputUsage: 70,
      highContrastEnabled: true,
      audioGuidanceUsage: 90
    },
    performanceMetrics: {
      averageScore: 82,
      totalQuizzes: 8,
      improvementRate: 18,
      strongSubjects: ["general"],
      weakSubjects: ["math"]
    },
    quizAttempts: [
      {
        id: "q6",
        studentId: "s5",
        date: "2025-10-23T10:00:00",
        gradeLevel: 1,
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        duration: 200,
        questions: [
          {
            questionId: "q1_1",
            questionText: "What comes after 5?",
            options: ["4", "5", "6", "7"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 25,
            inputMode: "voice",
            subject: "math"
          },
          {
            questionId: "q1_2",
            questionText: "What color is an apple?",
            options: ["Blue", "Red", "Purple", "Black"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 20,
            inputMode: "voice",
            subject: "general"
          },
          {
            questionId: "q1_3",
            questionText: "How many sides does a triangle have?",
            options: ["2", "3", "4", "5"],
            correctAnswer: 1,
            studentAnswer: 2,
            isCorrect: false,
            timeSpent: 55,
            inputMode: "touch",
            subject: "math"
          },
          {
            questionId: "q1_4",
            questionText: "Which animal can fly?",
            options: ["Dog", "Cat", "Bird", "Fish"],
            correctAnswer: 2,
            studentAnswer: 2,
            isCorrect: true,
            timeSpent: 30,
            inputMode: "voice",
            subject: "general"
          },
          {
            questionId: "q1_5",
            questionText: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1,
            studentAnswer: 1,
            isCorrect: true,
            timeSpent: 35,
            inputMode: "voice",
            subject: "math"
          }
        ]
      }
    ]
  }
];

export const getClassOverview = () => {
  const totalStudents = teacherMockData.length;
  const activeToday = teacherMockData.filter(s => {
    const latestAttempt = s.quizAttempts[0];
    if (!latestAttempt) return false;
    const today = new Date().toDateString();
    const attemptDate = new Date(latestAttempt.date).toDateString();
    return today === attemptDate;
  }).length;
  
  const avgScore = Math.round(
    teacherMockData.reduce((sum, s) => sum + s.performanceMetrics.averageScore, 0) / totalStudents
  );
  
  const totalQuizzes = teacherMockData.reduce((sum, s) => sum + s.performanceMetrics.totalQuizzes, 0);
  const completionRate = Math.round((totalQuizzes / (totalStudents * 20)) * 100);
  
  return {
    totalStudents,
    activeToday,
    averageScore: avgScore,
    completionRate
  };
};