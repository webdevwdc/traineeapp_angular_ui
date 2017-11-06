import { TestBed, inject } from '@angular/core/testing';

import { AuthLocalService } from './auth-local.service';

describe('AuthLocalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLocalService]
    });
  });

  it('should be created', inject([AuthLocalService], (service: AuthLocalService) => {
    expect(service).toBeTruthy();
  }));
});
