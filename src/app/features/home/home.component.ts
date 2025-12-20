import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { PingService } from '../../core/services/ping.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Home</h1>
      <p class="mt-1 text-sm text-slate-600">Minimal standalone setup with router + HttpClient.</p>

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
