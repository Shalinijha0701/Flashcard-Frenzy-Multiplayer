export const sampleQuestions = [
  // Mathematics - Easy
  {
    question: "What is 15 + 27?",
    options: ["40", "42", "45", "47"],
    correctAnswer: "42",
    explanation: "15 + 27 = 42",
    category: "Mathematics",
    difficulty: "easy" as const,
    tags: ["addition", "basic arithmetic"],
    isVerified: true
  },
  {
    question: "What is 8 × 7?",
    options: ["54", "56", "58", "60"],
    correctAnswer: "56",
    explanation: "8 × 7 = 56",
    category: "Mathematics",
    difficulty: "easy" as const,
    tags: ["multiplication", "times tables"],
    isVerified: true
  },
  {
    question: "What is 144 ÷ 12?",
    options: ["10", "12", "14", "16"],
    correctAnswer: "12",
    explanation: "144 ÷ 12 = 12",
    category: "Mathematics",
    difficulty: "easy" as const,
    tags: ["division", "basic arithmetic"],
    isVerified: true
  },

  // Mathematics - Medium
  {
    question: "What is the square root of 169?",
    options: ["11", "12", "13", "14"],
    correctAnswer: "13",
    explanation: "√169 = 13 because 13² = 169",
    category: "Mathematics",
    difficulty: "medium" as const,
    tags: ["square roots", "algebra"],
    isVerified: true
  },
  {
    question: "If x + 5 = 12, what is x?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "x + 5 = 12, so x = 12 - 5 = 7",
    category: "Mathematics",
    difficulty: "medium" as const,
    tags: ["algebra", "equations"],
    isVerified: true
  },

  // Science - Easy
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O",
    explanation: "Water is composed of two hydrogen atoms and one oxygen atom (H2O)",
    category: "Science",
    difficulty: "easy" as const,
    tags: ["chemistry", "compounds"],
    isVerified: true
  },
  {
    question: "How many planets are in our solar system?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8",
    explanation: "There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune",
    category: "Science",
    difficulty: "easy" as const,
    tags: ["astronomy", "solar system"],
    isVerified: true
  },
  {
    question: "What gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    explanation: "Plants absorb carbon dioxide (CO2) and release oxygen during photosynthesis",
    category: "Science",
    difficulty: "easy" as const,
    tags: ["biology", "photosynthesis"],
    isVerified: true
  },

  // Science - Medium
  {
    question: "What is the atomic number of carbon?",
    options: ["4", "6", "8", "12"],
    correctAnswer: "6",
    explanation: "Carbon has 6 protons, giving it an atomic number of 6",
    category: "Science",
    difficulty: "medium" as const,
    tags: ["chemistry", "atomic structure"],
    isVerified: true
  },
  {
    question: "What is the speed of light in a vacuum?",
    options: ["300,000 km/s", "299,792,458 m/s", "150,000 km/s", "500,000 km/s"],
    correctAnswer: "299,792,458 m/s",
    explanation: "The speed of light in a vacuum is exactly 299,792,458 meters per second",
    category: "Science",
    difficulty: "medium" as const,
    tags: ["physics", "constants"],
    isVerified: true
  },

  // History - Easy
  {
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: "1945",
    explanation: "World War II ended in 1945 with the surrender of Japan",
    category: "History",
    difficulty: "easy" as const,
    tags: ["world war", "20th century"],
    isVerified: true
  },
  {
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
    correctAnswer: "George Washington",
    explanation: "George Washington served as the first President from 1789 to 1797",
    category: "History",
    difficulty: "easy" as const,
    tags: ["US presidents", "founding fathers"],
    isVerified: true
  },
  {
    question: "Which ancient wonder of the world was located in Egypt?",
    options: ["Hanging Gardens", "Colossus of Rhodes", "Great Pyramid of Giza", "Lighthouse of Alexandria"],
    correctAnswer: "Great Pyramid of Giza",
    explanation: "The Great Pyramid of Giza is the only ancient wonder still standing today",
    category: "History",
    difficulty: "easy" as const,
    tags: ["ancient civilizations", "Egypt"],
    isVerified: true
  },

  // History - Medium
  {
    question: "The Magna Carta was signed in which year?",
    options: ["1205", "1215", "1225", "1235"],
    correctAnswer: "1215",
    explanation: "The Magna Carta was signed by King John of England in 1215",
    category: "History",
    difficulty: "medium" as const,
    tags: ["medieval history", "England"],
    isVerified: true
  },
  {
    question: "Which empire was ruled by Julius Caesar?",
    options: ["Greek Empire", "Roman Empire", "Persian Empire", "Egyptian Empire"],
    correctAnswer: "Roman Empire",
    explanation: "Julius Caesar was a Roman general and statesman who ruled the Roman Empire",
    category: "History",
    difficulty: "medium" as const,
    tags: ["ancient Rome", "emperors"],
    isVerified: true
  },

  // Geography - Easy
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    explanation: "Paris is the capital and largest city of France",
    category: "Geography",
    difficulty: "easy" as const,
    tags: ["capitals", "Europe"],
    isVerified: true
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    explanation: "The Pacific Ocean covers about 46% of the Earth's water surface",
    category: "Geography",
    difficulty: "easy" as const,
    tags: ["oceans", "Earth"],
    isVerified: true
  },
  {
    question: "On which continent is Brazil located?",
    options: ["North America", "South America", "Africa", "Asia"],
    correctAnswer: "South America",
    explanation: "Brazil is the largest country in South America",
    category: "Geography",
    difficulty: "easy" as const,
    tags: ["continents", "countries"],
    isVerified: true
  },

  // Geography - Medium
  {
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
    correctAnswer: "Nile River",
    explanation: "The Nile River is approximately 6,650 km long, making it the longest river",
    category: "Geography",
    difficulty: "medium" as const,
    tags: ["rivers", "Africa"],
    isVerified: true
  },
  {
    question: "Which mountain range contains Mount Everest?",
    options: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
    correctAnswer: "Himalayas",
    explanation: "Mount Everest is located in the Himalayan mountain range",
    category: "Geography",
    difficulty: "medium" as const,
    tags: ["mountains", "Asia"],
    isVerified: true
  },

  // Literature - Easy
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    explanation: "Romeo and Juliet is a tragedy written by William Shakespeare",
    category: "Literature",
    difficulty: "easy" as const,
    tags: ["Shakespeare", "plays"],
    isVerified: true
  },
  {
    question: "In which book series would you find the character Harry Potter?",
    options: ["Lord of the Rings", "Harry Potter", "Chronicles of Narnia", "Percy Jackson"],
    correctAnswer: "Harry Potter",
    explanation: "Harry Potter is the main character in J.K. Rowling's Harry Potter series",
    category: "Literature",
    difficulty: "easy" as const,
    tags: ["fantasy", "modern literature"],
    isVerified: true
  },

  // Sports - Easy
  {
    question: "How many players are on a basketball team on the court at one time?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "5",
    explanation: "Each basketball team has 5 players on the court during play",
    category: "Sports",
    difficulty: "easy" as const,
    tags: ["basketball", "team sports"],
    isVerified: true
  },
  {
    question: "In which sport would you perform a slam dunk?",
    options: ["Tennis", "Basketball", "Soccer", "Baseball"],
    correctAnswer: "Basketball",
    explanation: "A slam dunk is a basketball shot where the player jumps and puts the ball through the hoop",
    category: "Sports",
    difficulty: "easy" as const,
    tags: ["basketball", "techniques"],
    isVerified: true
  },

  // Computer Science - Easy
  {
    question: "What does 'HTML' stand for?",
    options: ["High Tech Modern Language", "Hypertext Markup Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"],
    correctAnswer: "Hypertext Markup Language",
    explanation: "HTML stands for Hypertext Markup Language, used for creating web pages",
    category: "Computer Science",
    difficulty: "easy" as const,
    tags: ["web development", "programming"],
    isVerified: true
  },
  {
    question: "What is the most popular programming language for web development?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
    explanation: "JavaScript is the most widely used programming language for web development",
    category: "Computer Science",
    difficulty: "easy" as const,
    tags: ["programming languages", "web development"],
    isVerified: true
  },

  // Computer Science - Medium
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: "O(log n)",
    explanation: "Binary search has O(log n) time complexity as it divides the search space in half each iteration",
    category: "Computer Science",
    difficulty: "medium" as const,
    tags: ["algorithms", "complexity"],
    isVerified: true
  },
  {
    question: "Which data structure uses LIFO (Last In, First Out)?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack",
    explanation: "A stack follows LIFO principle where the last element added is the first to be removed",
    category: "Computer Science",
    difficulty: "medium" as const,
    tags: ["data structures", "programming"],
    isVerified: true
  }
]

export const categories = [
  "Mathematics",
  "Science", 
  "History",
  "Geography",
  "Literature",
  "Sports",
  "Computer Science",
  "Art",
  "Music",
  "Movies",
  "General Knowledge"
]

export const difficulties = ["easy", "medium", "hard"] as const