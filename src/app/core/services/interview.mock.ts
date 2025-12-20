import { Injectable } from '@angular/core';

import { delay, Observable, of } from 'rxjs';

import { InterviewRequest, InterviewResponse } from '../models/interview.models';

@Injectable({
  providedIn: 'root'
})
export class InterviewMock {
  chat(request: InterviewRequest): Observable<InterviewResponse> {
    const conversationId = request.chatMessage.conversationId ?? this.generateConversationId();
    const isInit = !request.chatMessage.conversationId;

    const assistantMessage = isInit
      ? 'Hi! Let\'s start the interview. Tell me briefly about your most recent project.'
      : this.buildAssistantReply(request.chatMessage.message);

    const response: InterviewResponse = {
      conversationId,
      assistantMessage,
      coachingTips: isInit
        ? ['Answer concisely (1-2 minutes)', 'Highlight impact with numbers', 'Mention your role and scope']
        : ['Use STAR structure', 'Focus on decisions and trade-offs', 'End with measurable results']
    };

    return of(response).pipe(delay(700));
  }

  private buildAssistantReply(userMessage: string): string {
    const trimmed = userMessage.trim();

    if (!trimmed) {
      return 'Send a short answer and I will ask the next question.';
    }

    return `Thanks! You said: "${trimmed}". What was the biggest challenge and how did you solve it?`;
  }

  private generateConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}
