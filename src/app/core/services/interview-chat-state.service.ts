import { Injectable, signal } from '@angular/core';

export type ChatItem = {
  role: 'user' | 'assistant';
  text: string;
};

@Injectable({
  providedIn: 'root'
})
export class InterviewChatStateService {
  readonly isLoading = signal<boolean>(false);
  readonly conversationId = signal<string | null>(null);
  readonly messages = signal<ChatItem[]>([]);

  reset(): void {
    this.isLoading.set(false);
    this.conversationId.set(null);
    this.messages.set([]);
  }
}
