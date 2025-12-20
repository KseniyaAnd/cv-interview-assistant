import { Injectable } from '@angular/core';

import { delay, Observable, of, tap } from 'rxjs';

import { CvGenerateRequest, CvGenerateResponse } from '../models/cv-generate.models';

@Injectable({
  providedIn: 'root'
})
export class CvMock {
  generate(request: CvGenerateRequest): Observable<CvGenerateResponse> {
    console.log('CvMock.generate called with:', request);
    const response: CvGenerateResponse = {
      cvMarkdown: `# ${request.profile?.fullName ?? 'Candidate'}\n\n## Target\n${request.targetCompany}\n\n## Skills\n${(request.profile?.skills ?? []).map((s) => `- ${s}`).join('\n') || '- (not provided)'}`,
      coverLetterMarkdown: `Dear Hiring Team at ${request.targetCompany},\n\nI am applying for ${request.vacancyTitle ?? 'the position'}.\n\nSincerely,\n${request.profile?.fullName ?? 'Candidate'}`,
      interviewTips: ['Use STAR method', 'Be specific about impact', 'Ask clarifying questions']
    };

    console.log('CvMock: returning Observable with delay(600)');
    return of(response).pipe(
      delay(600),
      tap({
        next: (res) => console.log('CvMock: next called', res),
        complete: () => console.log('CvMock: complete called'),
        error: (err) => console.error('CvMock: error called', err)
      })
    );
  }
}
