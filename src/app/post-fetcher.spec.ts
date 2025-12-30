import { TestBed } from '@angular/core/testing';

import { PostFetcher } from './post-fetcher';

describe('PostFetcher', () => {
  let service: PostFetcher;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostFetcher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
