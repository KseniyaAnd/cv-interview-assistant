import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
          <label class="text-sm font-medium" for="education">Education (comma separated)</label>
          <input
            id="education"
            class="rounded border px-3 py-2"
            formControlName="education"
            placeholder="B.Sc. CS, M.Sc. CS"
          />
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="languages">Languages (comma separated)</label>
          <input
            id="languages"
            class="rounded border px-3 py-2"
            formControlName="languages"
            placeholder="RU: native, EN: B2"
          />
        </div>

        <div class="grid gap-2 rounded-md border bg-slate-50 p-4">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-sm font-semibold">Experience</h2>
            <button
              type="button"
              class="rounded border bg-white px-3 py-1 text-sm font-medium"
              (click)="addExperience()"
            >
              +
            </button>
          </div>

          <div formArrayName="experience" class="grid gap-4">
            @for (exp of experienceControls(); track $index) {
              <div class="grid gap-3 rounded-md border bg-white p-4" [formGroupName]="$index">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="text-sm font-semibold">Position {{ $index + 1 }}</h3>
                  <button
                    type="button"
                    class="rounded border bg-white px-3 py-1 text-sm font-medium"
                    (click)="removeExperience($index)"
                  >
                    Remove
                  </button>
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expCompany' + $index">Company</label>
                  <input
                    [id]="'expCompany' + $index"
                    class="rounded border px-3 py-2"
                    formControlName="company"
                  />
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expTitle' + $index">Title</label>
                  <input
                    [id]="'expTitle' + $index"
                    class="rounded border px-3 py-2"
                    formControlName="title"
                  />
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expStart' + $index">Start (YYYY-MM)</label>
                  <input
                    [id]="'expStart' + $index"
                    class="rounded border px-3 py-2"
                    formControlName="start"
                    placeholder="2021-05"
                  />
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expEnd' + $index">End (YYYY-MM)</label>
                  <input
                    [id]="'expEnd' + $index"
                    class="rounded border px-3 py-2"
                    formControlName="end"
                    placeholder="2024-11"
                  />
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expAchievements' + $index">Achievements (comma separated)</label>
                  <input
                    [id]="'expAchievements' + $index"
                    class="rounded border px-3 py-2"
                    formControlName="achievements"
                    placeholder="Designed RBAC with OpenFGA, Cut p95 latency by 40%"
                  />
                </div>
              </div>
            }
          </div>
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

  private createExperienceGroup() {
    return this.fb.nonNullable.group({
      company: [''],
      title: [''],
      start: [''],
      end: [''],
      achievements: ['']
    });
  }

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required]],
    desiredTitle: [''],
    skills: [''],
    education: [''],
    languages: [''],
    experience: this.fb.array([this.createExperienceGroup()]),
    targetCompany: ['', [Validators.required]],
    vacancyTitle: [''],
    vacancyDescription: ['']
  });

  protected readonly isLoading = signal<boolean>(false);
  protected readonly result= signal<CvGenerateResponse | null>(null);

  protected experienceControls() {
    return (this.form.controls.experience as FormArray).controls;
  }

  addExperience(): void {
    (this.form.controls.experience as FormArray).push(this.createExperienceGroup());
  }

  removeExperience(index: number): void {
    const arr = this.form.controls.experience as FormArray;
    if (arr.length <= 1) {
      arr.at(0).reset();
      return;
    }

    arr.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid || this.isLoading()) {
      return;
    }

    const value = this.form.getRawValue();
    const skills = value.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const education = value.education
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const languages = value.languages
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const experience = (value.experience ?? [])
      .map((exp) => {
        const achievements = (exp.achievements ?? '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

        return {
          company: exp.company,
          title: exp.title,
          start: exp.start,
          end: exp.end || undefined,
          achievements: achievements.length ? achievements : undefined
        };
      })
      .filter((exp) => Boolean(exp.company || exp.title || exp.start));

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
          skills: skills.length ? skills : undefined,
          experience: experience.length ? experience : undefined,
          education: education.length ? education : undefined,
          languages: languages.length ? languages : undefined
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
