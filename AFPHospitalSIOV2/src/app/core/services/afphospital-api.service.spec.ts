import { TestBed } from '@angular/core/testing';

import { AFPHospitalAPIService } from './afphospital-api.service';

describe('AFPHospitalAPIService', () => {
  let service: AFPHospitalAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AFPHospitalAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
