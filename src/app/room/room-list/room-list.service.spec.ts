import { TestBed } from '@angular/core/testing';

import { RoomListService } from './room-list.service';

describe('RoomListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomListService = TestBed.get(RoomListService);
    expect(service).toBeTruthy();
  });
});
