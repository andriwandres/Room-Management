import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { User, UserDto } from '../user.entity';

class MockAuthService {
  login = () => null;
  register = () => null;
}

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: new MockAuthService()
      }]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('login(user)', () => {
    it('should return an access token', async () => {
      const token = '70k3n';

      jest.spyOn(authService, 'login').mockImplementation(async () => token);

      const payload: UserDto = {
        email: 'test@test.test',
        password: 'test'
      };

      expect(await authController.login(payload)).toBe(token);
    });

    it('should throw a BadRequestException', async () => {
      jest.spyOn(authService, 'login').mockImplementation(async () => null);

      const payload: UserDto = {
        email: 'test@test.test',
        password: 'test'
      };

      expect(authController.login(payload)).rejects.toThrow(BadRequestException);
    });
  });

  describe('register(user)', () => {
    it('should return a user object', async () => {
      jest.spyOn(authService, 'register').mockImplementation(async () => user);

      const user = {
        email: 'test@test.test',
        password: 'test'
      } as User;

      expect(await authController.register(user)).toBe(user);
    });

    it('should throw a BadRequestException', async () => {
      jest.spyOn(authService, 'register').mockImplementation(async () => null);

      const payload: UserDto = {
        email: 'test@test.test',
        password: 'test'
      };

      expect(authController.login(payload)).rejects.toThrow(BadRequestException);
    });
  });
});
