export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: "multiple-choice" | "voice-input";
  audioDescription?: string;
  grade: 1 | 2 | 3 | 4 | 5;
  subject: "math" | "english" | "science" | "general";
}

export const sampleQuestions: Question[] = [
  // Grade 1 Questions
  {
    id: "q1",
    question: "What comes after the number 5?",
    options: ["4", "6", "7", "3"],
    correctAnswer: 1,
    type: "multiple-choice",
    audioDescription: "Count with me: 1, 2, 3, 4, 5... what's next?",
    grade: 1,
    subject: "math"
  },
  {
    id: "q2", 
    question: "Which animal says 'Meow'?",
    options: ["Dog", "Cat", "Cow", "Bird"],
    correctAnswer: 1,
    type: "multiple-choice",
    audioDescription: "Listen to the sound: Meow, meow! Which animal makes this sound?",
    grade: 1,
    subject: "general"
  },
  {
    id: "q3",
    question: "How many legs does a dog have?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    type: "multiple-choice",
    audioDescription: "Think about a dog walking. Count its legs!",
    grade: 1,
    subject: "general"
  },
  
  // Grade 2 Questions
  {
    id: "q4",
    question: "What is 3 plus 4?",
    options: ["6", "7", "8", "5"],
    correctAnswer: 1,
    type: "multiple-choice",
    audioDescription: "Count on your fingers: 3 plus 4 equals what number?",
    grade: 2,
    subject: "math"
  },
  {
    id: "q5",
    question: "Which word rhymes with 'cat'?",
    options: ["Dog", "Hat", "Car", "Sun"],
    correctAnswer: 1,
    type: "multiple-choice",
    audioDescription: "Cat rhymes with... bat, rat, hat! Which one is in the options?",
    grade: 2,
    subject: "english"
  },
  
  // Grade 3 Questions  
  {
    id: "q6",
    question: "What is 6 times 2?",
    options: ["10", "12", "14", "8"],
    correctAnswer: 1,
    type: "multiple-choice",
    audioDescription: "Six groups of two, or 6 × 2 equals what?",
    grade: 3,
    subject: "math"
  },
  {
    id: "q7",
    question: "Plants need sunlight, water, and what else to grow?",
    options: ["Air", "Rocks", "Sand", "Toys"],
    correctAnswer: 0,
    type: "multiple-choice",
    audioDescription: "Plants need three main things: sunlight, water, and one more thing to breathe and grow.",
    grade: 3,
    subject: "science"
  },
  
  // Grade 4 Questions
  {
    id: "q8",
    question: "What is the capital of the United States?",
    options: ["New York", "Los Angeles", "Washington D.C.", "Chicago"],
    correctAnswer: 2,
    type: "multiple-choice",
    audioDescription: "The capital city is where the president lives and works.",
    grade: 4,
    subject: "general"
  },
  {
    id: "q9",
    question: "How many minutes are in one hour?",
    options: ["50", "60", "70", "40"],
    correctAnswer: 1,
    type: "multiple-choice",
    audioDescription: "Think about a clock. One full hour has how many minutes?",
    grade: 4,
    subject: "math"
  },
  
  // Grade 5 Questions
  {
    id: "q10",
    question: "What is 144 divided by 12?",
    options: ["11", "12", "13", "10"],
    correctAnswer: 1,
    type: "multiple-choice",
    audioDescription: "How many groups of 12 can you make from 144?",
    grade: 5,
    subject: "math"
  },
  {
    id: "q11",
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1,
    type: "multiple-choice",
    audioDescription: "In our solar system, which planet is the first one from the Sun?",
    grade: 5,
    subject: "science"
  }
];

// Sample TTS feedback lines for different scenarios
export const feedbackMessages = {
  correct: [
    "Excellent work! You got it right!",
    "Fantastic! That's the correct answer!",
    "Wonderful! You're doing great!",
    "Perfect! Keep up the amazing work!",
    "Brilliant! You're so smart!",
    "Outstanding! That's exactly right!"
  ],
  incorrect: [
    "Good try! Let's learn from this together!",
    "Not quite, but you're learning! Keep going!",
    "That's okay! Every mistake helps us learn!",
    "Nice effort! Let's try the next question!",
    "You're doing well! Learning takes practice!",
    "Great attempt! You're getting better!"
  ],
  encouragement: [
    "You can do it!",
    "Keep trying, you're amazing!",
    "I believe in you!",
    "You're doing fantastic!",
    "Every question makes you smarter!",
    "You're a star learner!"
  ]
};

export const getRandomFeedback = (type: keyof typeof feedbackMessages): string => {
  const messages = feedbackMessages[type];
  return messages[Math.floor(Math.random() * messages.length)];
};