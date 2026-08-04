export interface CategoryItem {
  id: string;
  name: string;
  category: string;
  hints?: string[];
  attributes?: Record<string, string | boolean | number>;
  icon?: string;
}

export interface CategoryGroup {
  id: string;
  name: string;
  iconName: string;
  description: string;
  sampleItems: string[];
  itemCount: number;
  popularQuestions: string[];
  gradient: string;
}

export interface QuestionTurn {
  id: string;
  questionNumber: number;
  askedBy: 'PLAYER' | 'OPPONENT';
  questionText: string;
  answerText: string;
  answeredBy: 'PLAYER' | 'OPPONENT';
  timestamp?: string;
  isPenaltyTurn?: boolean;
}

export interface GuessAttempt {
  guessedBy: 'PLAYER' | 'OPPONENT';
  guessedItem: string;
  isCorrect: boolean;
  questionNumber: number;
}

export interface MatchHistory {
  matchId: string;
  roomCode: string;
  category: string;
  playerSecret: string;
  opponentSecret: string;
  turns: QuestionTurn[];
  guesses: GuessAttempt[];
  winner: 'PLAYER' | 'OPPONENT' | null;
  durationSeconds: number;
  date: string;
}

export interface AiReviewResult {
  fairPlayScore: number;
  status: 'CLEAN' | 'FLAGGED' | 'PERFECT';
  summary: string;
  contradictions: Array<{
    questionNumber: number;
    issue: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
  }>;
  keyInsights: string[];
  strategicDeductionHighlight: string;
}

export type MobileScreenType =
  | 'splash'
  | 'login'
  | 'home'
  | 'create_room'
  | 'join_room'
  | 'secret_selection'
  | 'gameplay'
  | 'guess'
  | 'victory'
  | 'defeat'
  | 'replay'
  | 'ai_review';
