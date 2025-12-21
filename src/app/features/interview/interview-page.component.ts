import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { finalize } from 'rxjs';

import { InterviewChatStateService } from '../../core/services/interview-chat-state.service';
import { InterviewService } from '../../core/services/interview.service';

@Component({
  selector: 'app-interview-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
     <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Interview</h1>
      <p class="mt-1 text-sm text-slate-600">Mini interview chat.</p>
      <button
          type="button"
          class="rounded border border-slate-300 bg-white px-4 py-2 mt-2 text-sm font-medium text-slate-900 disabled:opacity-50"
          (click)="resetChat()"
          [disabled]="isLoading() || !messages().length"
        >
          Clear chat
      </button>

      @if (messages().length) {
        <div class="mt-4 grid gap-2">
          @for (item of messages(); track item) {
            <div
              class="rounded-md border px-3 py-2 text-sm"
              [class.bg-slate-50]="item.role === 'assistant'"
              [class.bg-white]="item.role === 'user'"
            >
              <div class="text-xs font-semibold text-slate-600">{{ item.role }}</div>
              <div class="mt-1 whitespace-pre-wrap">{{ item.text }}</div>
            </div>
          }
        </div>
      } 
      @else {
        <div class="mt-4 rounded-md border bg-slate-50 p-4 text-sm text-slate-600">
          Send the first message to start the interview.
        </div>
      }

      <form class="mt-4 flex gap-2" [formGroup]="form" (submit)="onSubmit()">
        <input
          class="w-full rounded border px-3 py-2"
          type="text"
          formControlName="message"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          class="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          [disabled]="form.invalid || isLoading()"
        >
          {{ buttonText() }}
        </button>
      </form>
    </section>
  `
})
export class InterviewPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly interviewService = inject(InterviewService);
  private readonly chatState = inject(InterviewChatStateService);

  readonly form = this.fb.nonNullable.group({
    message: ['', [Validators.required]]
  });

  protected readonly isLoading = this.chatState.isLoading;
  protected readonly conversationId = this.chatState.conversationId;
  protected readonly messages = this.chatState.messages;

  protected readonly buttonText = computed(() => 
    this.isLoading() ? 'Loading...' : 'Send'
  );

  protected readonly canSubmit = computed(() => 
    this.form.valid && !this.isLoading()
  );
  
  onSubmit(): void {
    if (!this.canSubmit()) {
      return;
    }

    const messageControl = this.form.get('message');
    const message = messageControl?.value?.trim() || '';

    if (!message) {
      return;
    }

    this.messages.update(messages => [
      ...messages, 
      { role: 'user', text: message }
    ]);

    this.form.reset({ message: '' });
    this.isLoading.set(true);

    const currentConversationId = this.conversationId();

    const request$ = currentConversationId 
      ? this.interviewService.sendMessage(message, currentConversationId)
      : this.interviewService.sendMessage(message);

    request$
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          if (res.conversationId) {
            this.conversationId.set(res.conversationId);
          }
          
          this.addAssistantMessage(res.assistantMessage);
        },
        error: (err: unknown) => {
          console.error('Interview error:', err);
          this.messages.update(messages => [
            ...messages, 
            { role: 'assistant', text: 'Sorry, an error occurred. Please try again.' }
          ]);
        }
      });
  }

  private addAssistantMessage(message: string | undefined | null): void {
    if (!message) {
      return;
    }
    
    this.messages.update(messages => [
      ...messages, 
      { role: 'assistant', text: message }
    ]);
  }

  resetChat(): void {
    this.chatState.reset();
    this.form.reset({ message: '' });
  }
}
