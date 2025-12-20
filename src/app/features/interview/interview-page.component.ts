import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { finalize } from 'rxjs';

import { InterviewService } from '../../core/services/interview.service';

type ChatItem = {
  role: 'user' | 'assistant';
  text: string;
};

@Component({
  selector: 'app-interview-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Interview</h1>
      <p class="mt-1 text-sm text-slate-600">Mini interview chat.</p>

      <div class="mt-4 grid gap-2" *ngIf="messages.length; else emptyState">
        <div
          *ngFor="let item of messages"
          class="rounded-md border px-3 py-2 text-sm"
          [class.bg-slate-50]="item.role === 'assistant'"
          [class.bg-white]="item.role === 'user'"
        >
          <div class="text-xs font-semibold text-slate-600">{{ item.role }}</div>
          <div class="mt-1 whitespace-pre-wrap">{{ item.text }}</div>
        </div>
      </div>

      <ng-template #emptyState>
        <div class="mt-4 rounded-md border bg-slate-50 p-4 text-sm text-slate-600">
          Send the first message to start the interview.
        </div>
      </ng-template>

      <form class="mt-4 flex gap-2" [formGroup]="form" (ngSubmit)="onSubmit()">
        <input
          class="w-full rounded border px-3 py-2"
          type="text"
          formControlName="message"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          class="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          [disabled]="form.invalid || isLoading"
        >
          {{ isLoading ? 'Loading...' : 'Send' }}
        </button>
      </form>

      <div class="mt-3 text-sm text-slate-600" *ngIf="isLoading">Loading...</div>
    </section>
  `
})
export class InterviewPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly interviewService = inject(InterviewService);

  readonly form = this.fb.nonNullable.group({
    message: ['', [Validators.required]]
  });

  isLoading = false;
  conversationId: string | null = null;
  messages: ChatItem[] = [];

  onSubmit(): void {
    if (this.form.invalid || this.isLoading) {
      return;
    }

    const message = this.form.getRawValue().message.trim();
    if (!message) {
      return;
    }

    this.messages = [...this.messages, { role: 'user', text: message }];
    this.form.reset({ message: '' });

    this.isLoading = true;

    const request$ = this.conversationId
      ? this.interviewService.sendMessage(message, this.conversationId)
      : this.interviewService.sendMessage(message);

    request$
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (res.conversationId) {
            this.conversationId = res.conversationId;
          }
          if (res.assistantMessage) {
            this.messages = [...this.messages, { role: 'assistant', text: res.assistantMessage }];
          }
        },
        error: (err: unknown) => console.error(err)
      });
  }
}
