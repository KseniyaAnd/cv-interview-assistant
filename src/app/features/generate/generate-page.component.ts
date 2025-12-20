import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { finalize } from 'rxjs';

import { CvGenerateResponse } from '../../core/models/cv-generate.models';
import { CvService } from '../../core/services/cv.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-generate-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="rounded-lg border bg-white p-6">
      <h1 class="text-lg font-semibold">Generate CV</h1>
      <p class="mt-1 text-sm text-slate-600">Fill the form and generate CV + cover letter.</p>

      <form class="mt-6 grid gap-4" [formGroup]="form" (submit)="onSubmit()">
        <div class="grid gap-1">
          <label class="text-sm font-medium" for="fullName">Full name</label>
          <input id="fullName" class="rounded border px-3 py-2" formControlName="fullName" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="desiredTitle">Desired title</label>
          <input id="desiredTitle" class="rounded border px-3 py-2" formControlName="desiredTitle" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="skills">Skills (comma separated)</label>
          <input
            id="skills"
            class="rounded border px-3 py-2"
            formControlName="skills"
            placeholder="Angular, TypeScript, RxJS"
          />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="targetCompany">Target company</label>
          <input id="targetCompany" class="rounded border px-3 py-2" formControlName="targetCompany" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="vacancyTitle">Vacancy title</label>
          <input id="vacancyTitle" class="rounded border px-3 py-2" formControlName="vacancyTitle" />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="vacancyDescription">Vacancy description</label>
          <textarea
            id="vacancyDescription"
            class="rounded border px-3 py-2"
            rows="6"
            formControlName="vacancyDescription"
          ></textarea>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            class="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            [disabled]="form.invalid || isLoading()"
          >
            {{ isLoading() ? 'Loading...' : 'Generate' }}
          </button>
        </div>
      </form>

      @if (result()) {
        <div class="mt-6 grid gap-4">
          <section class="rounded-md border bg-slate-50 p-4">
            <h2 class="text-sm font-semibold">CV Markdown</h2>
            <pre class="mt-2 whitespace-pre-wrap text-sm">{{ result()?.cvMarkdown ?? '' }}</pre>
          </section>

          <section class="rounded-md border bg-slate-50 p-4">
            <h2 class="text-sm font-semibold">Cover Letter Markdown</h2>
            <pre class="mt-2 whitespace-pre-wrap text-sm">{{ result()?.coverLetterMarkdown ?? '' }}</pre>
          </section>
        </div>
      }
      
    </section>
  `
})
export class GeneratePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly cvService = inject(CvService);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required]],
    desiredTitle: [''],
    skills: [''],
    targetCompany: ['', [Validators.required]],
    vacancyTitle: [''],
    vacancyDescription: ['']
  });

  protected readonly isLoading = signal<boolean>(false);
  protected readonly result= signal<CvGenerateResponse | null>(null);

  onSubmit(): void {
    if (this.form.invalid || this.isLoading()) {
      return;
    }

    const value = this.form.getRawValue();
    const skills = value.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    console.log('GeneratePageComponent: Starting submission');
    this.isLoading.set(true);
    this.result.set(null);

    this.cvService
      .generateCv({
        targetCompany: value.targetCompany,
        vacancyTitle: value.vacancyTitle || undefined,
        vacancyDescription: value.vacancyDescription || undefined,
        locale: 'ru-RU',
        profile: {
          fullName: value.fullName,
          desiredTitle: value.desiredTitle || undefined,
          skills: skills.length ? skills : undefined
        }
      })
      .pipe(
        finalize(() => {
          console.log('GeneratePageComponent: finalize called');
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('GeneratePageComponent: next called', res);
          this.result.set(res);
        },
        error: (err: unknown) => {
          console.error('GeneratePageComponent: error called', err);
          this.result.set(null);
        },
        complete: () => {
          console.log('GeneratePageComponent: complete called');
        }
      });
  }
}
