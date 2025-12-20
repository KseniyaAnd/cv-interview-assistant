import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-interview-page',
  standalone: true,
  imports: [InputTextModule, ButtonModule],
  template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Interview</h1>
      <p class="mt-1 text-sm text-slate-600">Chat page stub.</p>

      <div class="mt-4 flex gap-2">
        <input
          pInputText
          class="w-full"
          type="text"
          placeholder="Type a message..."
        />
        <p-button label="Send"></p-button>
      </div>
    </section>
  `
})
export class InterviewPageComponent {}
