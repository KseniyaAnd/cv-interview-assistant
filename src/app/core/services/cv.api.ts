import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CvGenerateRequest, CvGenerateResponse } from '../models/cv-generate.models';

@Injectable({
  providedIn: 'root'
})
export class CvApi {
  private readonly baseUrl = environment.api.baseUrl;

  constructor(private readonly http: HttpClient) {}

  generate(request: CvGenerateRequest): Observable<CvGenerateResponse> {
    return this.http.post<CvGenerateResponse>(`${this.baseUrl}/api/generate`, request).pipe(
      catchError((err: unknown) => {
        console.error(err);
        return of({ cvMarkdown: '', coverLetterMarkdown: '', interviewTips: [] });
      })
    );
  }
}
