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
    return this.generate(request);
  }

  generate(request: CvGenerateRequest): Observable<CvGenerateResponse> {
    if (environment.api.useMockApi) {
      return this.cvMock.generate(request);
    }

    return this.cvApi.generate(request);
  }
}
