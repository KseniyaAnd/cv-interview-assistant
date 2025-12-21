import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { finalize } from 'rxjs';

import { CvGenerateResponse } from '../../core/models/cv-generate.models';
import { CvService } from '../../core/services/cv.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { marked } from 'marked';

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
          <label class="text-sm font-medium" for="fullName">Full name <span class="text-red-600">*</span></label>
          <input
            id="fullName"
            class="rounded border px-3 py-2"
            [class.border-red-500]="isInvalid(form.controls.fullName)"
            required
            formControlName="fullName"
          />
          @if (isInvalid(form.controls.fullName)) {
            <p class="text-xs text-red-600">
              @if (form.controls.fullName.errors?.['required']) { Full name is required. }
              @if (form.controls.fullName.errors?.['minlength']) { Full name is too short. }
              @if (form.controls.fullName.errors?.['maxlength']) { Full name is too long. }
            </p>
          }
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="desiredTitle">Desired title</label>
          <input
            id="desiredTitle"
            class="rounded border px-3 py-2"
            [class.border-red-500]="isInvalid(form.controls.desiredTitle)"
            formControlName="desiredTitle"
          />
          @if (isInvalid(form.controls.desiredTitle)) {
            <p class="text-xs text-red-600">Desired title is too long.</p>
          }
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="skills">Skills (comma separated)</label>
          <input
            id="skills"
            class="rounded border px-3 py-2"
            [class.border-red-500]="isInvalid(form.controls.skills)"
            formControlName="skills"
            placeholder="Angular, TypeScript, RxJS"
          />
          @if (isInvalid(form.controls.skills)) {
            <p class="text-xs text-red-600">Skills is too long.</p>
          }
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="education">Education (comma separated)</label>
          <input
            id="education"
            class="rounded border px-3 py-2"
            [class.border-red-500]="isInvalid(form.controls.education)"
            formControlName="education"
            placeholder="B.Sc. CS, M.Sc. CS"
          />
          @if (isInvalid(form.controls.education)) {
            <p class="text-xs text-red-600">Education is too long.</p>
          }
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="languages">Languages (comma separated)</label>
          <input
            id="languages"
            class="rounded border px-3 py-2"
            [class.border-red-500]="isInvalid(form.controls.languages)"
            formControlName="languages"
            placeholder="RU: native, EN: B2"
          />
          @if (isInvalid(form.controls.languages)) {
            <p class="text-xs text-red-600">Languages is too long.</p>
          }
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
                    [class.border-red-500]="isInvalid(experienceControl($index, 'company'))"
                    formControlName="company"
                  />
                  @if (isInvalid(experienceControl($index, 'company'))) {
                    <p class="text-xs text-red-600">
                      @if (experienceGroupErrors($index)?.['companyRequired']) { Company is required. }
                      @if (experienceControl($index, 'company')?.errors?.['maxlength']) { Company is too long. }
                    </p>
                  }
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expTitle' + $index">Title</label>
                  <input
                    [id]="'expTitle' + $index"
                    class="rounded border px-3 py-2"
                    [class.border-red-500]="isInvalid(experienceControl($index, 'title'))"
                    formControlName="title"
                  />
                  @if (isInvalid(experienceControl($index, 'title'))) {
                    <p class="text-xs text-red-600">
                      @if (experienceGroupErrors($index)?.['titleRequired']) { Title is required. }
                      @if (experienceControl($index, 'title')?.errors?.['maxlength']) { Title is too long. }
                    </p>
                  }
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expStart' + $index">Start (YYYY-MM)</label>
                  <input
                    [id]="'expStart' + $index"
                    class="rounded border px-3 py-2"
                    [class.border-red-500]="isInvalid(experienceControl($index, 'start'))"
                    formControlName="start"
                    placeholder="2021-05"
                  />
                  @if (isInvalid(experienceControl($index, 'start'))) {
                    <p class="text-xs text-red-600">
                      @if (experienceGroupErrors($index)?.['startRequired']) { Start date is required. }
                      @if (experienceControl($index, 'start')?.errors?.['pattern']) { Use YYYY-MM format. }
                    </p>
                  }
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expEnd' + $index">End (YYYY-MM)</label>
                  <input
                    [id]="'expEnd' + $index"
                    class="rounded border px-3 py-2"
                    [class.border-red-500]="isInvalid(experienceControl($index, 'end')) || isExperienceGroupInvalid($index)"
                    formControlName="end"
                    placeholder="2024-11"
                  />
                  @if (isInvalid(experienceControl($index, 'end')) || isExperienceGroupInvalid($index)) {
                    <p class="text-xs text-red-600">
                      @if (experienceControl($index, 'end')?.errors?.['pattern']) { Use YYYY-MM format. }
                      @if (experienceGroupErrors($index)?.['endBeforeStart']) { End date must be after start. }
                    </p>
                  }
                </div>

                <div class="grid gap-1">
                  <label class="text-sm font-medium" [for]="'expAchievements' + $index">Achievements (comma separated)</label>
                  <input
                    [id]="'expAchievements' + $index"
                    class="rounded border px-3 py-2"
                    [class.border-red-500]="isInvalid(experienceControl($index, 'achievements'))"
                    formControlName="achievements"
                    placeholder="Designed RBAC with OpenFGA, Cut p95 latency by 40%"
                  />
                  @if (isInvalid(experienceControl($index, 'achievements'))) {
                    <p class="text-xs text-red-600">Achievements is too long.</p>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="targetCompany">Target company <span class="text-red-600">*</span></label>
          <input
            id="targetCompany"
            class="rounded border px-3 py-2"
            [class.border-red-500]="isInvalid(form.controls.targetCompany)"
            required
            formControlName="targetCompany"
          />
          @if (isInvalid(form.controls.targetCompany)) {
            <p class="text-xs text-red-600">
              @if (form.controls.targetCompany.errors?.['required']) { Target company is required. }
              @if (form.controls.targetCompany.errors?.['minlength']) { Target company is too short. }
              @if (form.controls.targetCompany.errors?.['maxlength']) { Target company is too long. }
            </p>
          }
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="vacancyTitle">Vacancy title</label>
          <input
            id="vacancyTitle"
            class="rounded border px-3 py-2"
            [class.border-red-500]="isInvalid(form.controls.vacancyTitle)"
            formControlName="vacancyTitle"
          />
          @if (isInvalid(form.controls.vacancyTitle)) {
            <p class="text-xs text-red-600">Vacancy title is too long.</p>
          }
        </div>

        <div class="grid gap-1">
          <label class="text-sm font-medium" for="vacancyDescription">Vacancy description</label>
          <textarea
            id="vacancyDescription"
            class="rounded border px-3 py-2"
            [class.border-red-500]="isInvalid(form.controls.vacancyDescription)"
            rows="6"
            formControlName="vacancyDescription"
          ></textarea>
          @if (isInvalid(form.controls.vacancyDescription)) {
            <p class="text-xs text-red-600">
              @if (form.controls.vacancyDescription.errors?.['minlength']) { Vacancy description is too short. }
              @if (form.controls.vacancyDescription.errors?.['maxlength']) { Vacancy description is too long. }
            </p>
          }
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
            <div class="mt-2 text-sm leading-6" [innerHTML]="cvHtml()"></div>
          </section>

          <section class="rounded-md border bg-slate-50 p-4">
            <h2 class="text-sm font-semibold">Cover Letter Markdown</h2>
            <div class="mt-2 text-sm leading-6" [innerHTML]="coverLetterHtml()"></div>
          </section>
        </div>
      }
      
    </section>
  `
})
export class GeneratePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly cvService = inject(CvService);

  private readonly monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;

  private readonly experienceGroupValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const company = (control.get('company')?.value as string | null | undefined) ?? '';
    const title = (control.get('title')?.value as string | null | undefined) ?? '';
    const start = (control.get('start')?.value as string | null | undefined) ?? '';
    const end = (control.get('end')?.value as string | null | undefined) ?? '';
    const achievements = (control.get('achievements')?.value as string | null | undefined) ?? '';

    const hasAny = Boolean(company || title || start || end || achievements);
    if (!hasAny) {
      return null;
    }

    const errors: ValidationErrors = {};

    if (!company.trim()) {
      errors['companyRequired'] = true;
    }
    if (!title.trim()) {
      errors['titleRequired'] = true;
    }
    if (!start.trim()) {
      errors['startRequired'] = true;
    }

    const startOk = Boolean(start.trim() && this.monthPattern.test(start.trim()));
    const endOk = Boolean(end.trim() && this.monthPattern.test(end.trim()));
    if (startOk && endOk && end.trim() < start.trim()) {
      errors['endBeforeStart'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };

  protected readonly cvHtml = computed(() => {
    const markdown = this.result()?.cvMarkdown ?? '';
    return (marked.parse(markdown) as string) || '';
  });

  protected readonly coverLetterHtml = computed(() => {
    const markdown = this.result()?.coverLetterMarkdown ?? '';
    return (marked.parse(markdown) as string) || '';
  });

  private createExperienceGroup() {
    return this.fb.nonNullable.group(
      {
        company: ['', [Validators.maxLength(120)]],
        title: ['', [Validators.maxLength(120)]],
        start: ['', [Validators.pattern(this.monthPattern)]],
        end: ['', [Validators.pattern(this.monthPattern)]],
        achievements: ['', [Validators.maxLength(400)]]
      },
      { validators: [this.experienceGroupValidator] }
    );
  }

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    desiredTitle: ['', [Validators.maxLength(120)]],
    skills: ['', [Validators.maxLength(300)]],
    education: ['', [Validators.maxLength(300)]],
    languages: ['', [Validators.maxLength(300)]],
    experience: this.fb.array([this.createExperienceGroup()]),
    targetCompany: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    vacancyTitle: ['', [Validators.maxLength(120)]],
    vacancyDescription: ['', [Validators.minLength(30), Validators.maxLength(4000)]]
  });

  protected readonly isLoading = signal<boolean>(false);
  protected readonly result= signal<CvGenerateResponse | null>(null);

  protected experienceControls() {
    return (this.form.controls.experience as FormArray).controls;
  }

  protected isInvalid(control: AbstractControl | null): boolean {
    return Boolean(control && control.invalid && (control.touched || control.dirty));
  }

  protected experienceControl(index: number, name: string): AbstractControl | null {
    return (this.form.controls.experience as FormArray).at(index).get(name);
  }

  protected experienceGroupErrors(index: number): ValidationErrors | null {
    return (this.form.controls.experience as FormArray).at(index).errors;
  }

  protected isExperienceGroupInvalid(index: number): boolean {
    const group = (this.form.controls.experience as FormArray).at(index);
    return Boolean(group.invalid && (group.touched || group.dirty));
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
    if (this.isLoading()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
