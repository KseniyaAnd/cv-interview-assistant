import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CvGenerateRequest, CvGenerateResponse } from '../models/cv-generate.models';
import { CvApi } from './cv.api';
import { CvMock } from './cv.mock';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  constructor(
    private readonly cvApi: CvApi,
    private readonly cvMock: CvMock
  ) {}

  generateCv(request: CvGenerateRequest): Observable<CvGenerateResponse> {
    console.log('CvService.generateCv called with:', request);
    return this.generate(request);
  }

  generate(request: CvGenerateRequest): Observable<CvGenerateResponse> {
    console.log('CvService.generate called, useMockApi:', environment.api.useMockApi);
    if (environment.api.useMockApi) {
      console.log('CvService: delegating to CvMock');
      return this.cvMock.generate(request);
    }

    console.log('CvService: delegating to CvApi');
    return this.cvApi.generate(request);
  }
}
