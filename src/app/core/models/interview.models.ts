export interface InterviewRequest {
  chatMessage: {
    conversationId?: string;
    message: string;
  };

  vacancySummary?: string;
  locale?: string;
}

export interface InterviewResponse {
  conversationId?: string;
  assistantMessage?: string;
  coachingTips?: string[];
}
