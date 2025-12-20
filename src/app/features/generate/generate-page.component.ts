import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-generate-page',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Generate CV</h1>
      <p class="mt-1 text-sm text-slate-600">CV generation page stub.</p>

      <div class="mt-4">
        <p-button label="Generate" severity="primary"></p-button>
      </div>
    </section>
  `
})
export class GeneratePageComponent {}
