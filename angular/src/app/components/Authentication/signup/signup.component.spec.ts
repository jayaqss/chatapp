import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let fixture: SignupComponent;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = {
      signup: jest.fn(),
    };

    fixture = new SignupComponent(authServiceMock);
    fixture.ngOnInit();
  });

  describe('Test: ngOnInit', () => {
    it('should initialize registerForm', () => {
      const signupForm = {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
      };
      expect(fixture.signupForm.value).toEqual(signupForm);
    });
  });

  describe('Test: Register Form', () => {
    it('should invalidate the form', () => {
      fixture.signupForm.controls.name.setValue(null);
      fixture.signupForm.controls.email.setValue(null);
      fixture.signupForm.controls.password.setValue(null);
      fixture.signupForm.controls.confirmPassword.setValue(null);
      expect(fixture.signupForm.valid).toBeFalsy();
    });

    it('should validate the form', () => {
      fixture.signupForm.controls.name.setValue('Mohan Raj');
      fixture.signupForm.controls.email.setValue('mohanraj@example.com');
      fixture.signupForm.controls.password.setValue('123456');
      fixture.signupForm.controls.confirmPassword.setValue('123456');
      expect(fixture.signupForm.valid).toBeTruthy();
    });
  });

  describe('Test registerUser', () => {
    it('should register user', () => {
      const theForm = {
        name: 'Mohan Raj',
        email: 'mohanraj@email.com',
        password: '123456',
        confirmPassword: '123456',
      };
      const response = {
        success: true,
        message:
          'User created successfully, please login to access your account.',
      };
      const spysignupUser = jest
        .spyOn(authServiceMock, 'signup')
        .mockReturnValue(response);
      expect(authServiceMock.signup(theForm)).toBe(response);
      expect(spysignupUser).toHaveBeenCalledWith(theForm);
    });
  });
});
