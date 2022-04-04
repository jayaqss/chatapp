import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: LoginComponent;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = {
      login: jest.fn(),
    };
    fixture = new LoginComponent(authServiceMock);
    fixture.ngOnInit();
  });

  describe('Test: ngOnInit', () => {
    it('should initialize loginForm', () => {
      const loginForm = {
        email: null,
        password: null,
      };
      expect(fixture.loginForm.value).toEqual(loginForm);
    });
  });

  describe('Test: Login Form', () => {
    it('should invalidate the form', () => {
      fixture.loginForm.controls.email.setValue(null);
      fixture.loginForm.controls.password.setValue(null);
      expect(fixture.loginForm.valid).toBeFalsy();
    });

    it('should validate the form', () => {
      fixture.loginForm.controls.email.setValue('reshma@example.com');
      fixture.loginForm.controls.password.setValue('123456');
      expect(fixture.loginForm.valid).toBeTruthy();
    });
  });

  describe('Test: Form valid', () => {
    it('should call loginUser', () => {
      const formData = {
        email: 'reshma@example.com',
        password: '123456',
      };
      const spyloginUser = jest
        .spyOn(authServiceMock, 'login')
        .mockReturnValue(true);
      expect(authServiceMock.login(formData)).toBe(true);
      expect(spyloginUser).toHaveBeenCalledWith(formData);
    });
  });
});
