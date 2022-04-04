import { TestBed } from '@angular/core/testing';

import { ChatInterceptor } from './chat.interceptor';

describe('ChatInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ChatInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ChatInterceptor = TestBed.inject(ChatInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
