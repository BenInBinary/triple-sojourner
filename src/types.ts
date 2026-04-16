export interface Question {
  id: string;
  categoryId: string;
  categoryName: string;
  text: string;
  requiresCode: boolean;
  idealAnswer: string;
  realLifeScenario: string;
  codingExample?: string;
}

export interface UserStats {
  approvedQuestions: string[];
  history: Record<string, {
    attempts: number;
    lastScore: number;
    lowestScore: number;
  }>;
}
