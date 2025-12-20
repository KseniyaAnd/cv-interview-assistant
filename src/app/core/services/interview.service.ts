import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { InterviewRequest, InterviewResponse } from '../models/interview.models';
import { InterviewApi } from './interview.api';
import { InterviewMock } from './interview.mock';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  constructor(
    private readonly interviewApi: InterviewApi,
    private readonly interviewMock: InterviewMock
  ) {}

  sendMessage(request: InterviewRequest): Observable<InterviewResponse> {
    if (environment.api.useMockApi) {
      return this.interviewMock.chat(request);
    }

    return this.interviewApi.chat(request);
  }
}
