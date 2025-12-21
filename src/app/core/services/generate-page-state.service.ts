import { Injectable, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { CvGenerateResponse } from '../models/cv-generate.models';

@Injectable({
  providedIn: 'root'
})
export class GeneratePageStateService {
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

  readonly isLoading = signal<boolean>(false);
  readonly result = signal<CvGenerateResponse | null>(null);

  constructor(private readonly fb: FormBuilder) {}

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

  resetResult(): void {
    this.result.set(null);
  }
}
