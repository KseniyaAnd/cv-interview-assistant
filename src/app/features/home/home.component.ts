import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { PingService } from '../../core/services/ping.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Home</h1>
      <p class="mt-1 text-sm text-slate-600">Minimal standalone setup with router + HttpClient.</p>

      <div class="mt-4 flex flex-wrap gap-2">
        <a class="inline-block" routerLink="/generate">
          <p-button label="Go to Generate CV" severity="secondary"></p-button>
        </a>
        <a class="inline-block" routerLink="/interview">
          <p-button label="Go to Interview" severity="secondary"></p-button>
        </a>
      </div>

      <div class="mt-4 flex items-center gap-2">
        <p-button label="Ping API" (onClick)="ping()"></p-button>
        <span class="text-sm text-slate-700">{{ status }}</span>
      </div>
    </section>
  `
})
export class HomeComponent {
  status = 'Idle';

  constructor(private readonly pingService: PingService) {}

  ping(): void {
    this.status = 'Loading...';

    this.pingService.ping().subscribe({
      next: () => (this.status = 'OK'),
      error: () => (this.status = 'Error')
    });
  }
}
