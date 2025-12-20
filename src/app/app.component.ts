import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen">
      <header class="border-b bg-white">
        <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div class="text-sm font-semibold tracking-wide">CV Interview Assistant</div>
          <div class="text-xs text-slate-500">Angular 21 + PrimeNG + Tailwind</div>
        </div>
      </header>

      <main class="mx-auto max-w-5xl px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}
