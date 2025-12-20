import { Injectable } from '@angular/core';

import { delay, Observable, of } from 'rxjs';

import { CvGenerateRequest, CvGenerateResponse } from '../models/cv-generate.models';

@Injectable({
  providedIn: 'root'
})
export class CvMock {
  generate(request: CvGenerateRequest): Observable<CvGenerateResponse> {
    const response: CvGenerateResponse = {
      cvMarkdown: `# ${request.profile?.fullName ?? 'Candidate'}\n\n## Target\n${request.targetCompany}\n\n## Skills\n${(request.profile?.skills ?? []).map((s) => `- ${s}`).join('\n') || '- (not provided)'}`,
      coverLetterMarkdown: `Dear Hiring Team at ${request.targetCompany},\n\nI am applying for ${request.vacancyTitle ?? 'the position'}.\n\nSincerely,\n${request.profile?.fullName ?? 'Candidate'}`,
      interviewTips: ['Use STAR method', 'Be specific about impact', 'Ask clarifying questions']
    };

    return of(response).pipe(delay(600));
  }
}
