import { TestBed, inject } from '@angular/core/testing';

import { WeightDataService } from './weight-data.service';

describe('WeightDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightDataService]
    });
  });

  it('should be created', inject([WeightDataService], (service: WeightDataService) => {
    expect(service).toBeTruthy();
  }));
});
