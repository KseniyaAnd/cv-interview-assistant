import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="min-h-screen">
      <header class="border-b bg-white">
        <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div class="flex items-center gap-4">
            <div class="text-sm font-semibold tracking-wide">CV Interview Assistant</div>
            <nav class="flex items-center gap-2 text-sm">
              <a
                routerLink="/generate"
                routerLinkActive="text-slate-900"
                class="rounded px-2 py-1 text-slate-600 hover:text-slate-900"
              >
                Generate
              </a>
              <a
                routerLink="/interview"
                routerLinkActive="text-slate-900"
                class="rounded px-2 py-1 text-slate-600 hover:text-slate-900"
              >
                Interview
              </a>
            </nav>
          </div>
          <div class="text-xs text-slate-500">Angular 21 + Tailwind</div>
        </div>
      </header>

      <main class="mx-auto max-w-5xl px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}
