import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'generate'
  },
  {
    path: 'generate',
    loadComponent: () =>
      import('./features/generate/generate-page.component').then((m) => m.GeneratePageComponent)
  },
  {
    path: 'interview',
    loadComponent: () =>
      import('./features/interview/interview-page.component').then((m) => m.InterviewPageComponent)
  },
  {
    path: '**',
    redirectTo: 'generate'
  }
];
