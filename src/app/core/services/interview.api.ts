import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { InterviewRequest, InterviewResponse } from '../models/interview.models';

@Injectable({
  providedIn: 'root'
})
export class InterviewApi {
  private readonly baseUrl = environment.api.baseUrl;

  constructor(private readonly http: HttpClient) {}

  chat(request: InterviewRequest): Observable<InterviewResponse> {
    let params = new HttpParams();

    if (request.vacancySummary) {
      params = params.set('vacancySummary', request.vacancySummary);
    }

    if (request.locale) {
      params = params.set('locale', request.locale);
    }

    return this.http
      .post<InterviewResponse>(`${this.baseUrl}/api/interview/chat`, request.chatMessage, {
        params
      })
      .pipe(
        catchError((err: unknown) => {
          console.error(err);
          return of({
            conversationId: request.chatMessage.conversationId,
            assistantMessage: 'Backend is unavailable. Please try again later.',
            coachingTips: []
          });
        })
      );
  }
}
