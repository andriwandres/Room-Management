import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { User } from '../user.entity';

class MockJwtService {
  sign = () => null;
}

class MockUserRepository {
  findOne = async () => null;
  save = async () => null;
}

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let repository: Repository<User>;

  beforeEach(async () => {
    jwtService = new MockJwtService() as any;
    repository = new MockUserRepository() as any;

    authService = new AuthService(jwtService, repository);
  });

  describe('getUserByEmail(email)', () => {
    it('should return a user object with email adress', async () => {
      const user: User = {
        userId: 1,
        email: 'test@test.test',
        password: 'test'
      };

      jest.spyOn(repository, 'findOne').mockImplementation(async () => user);

      expect(await authService.getUserByEmail(user.email)).toEqual(user);
    });
  });
});
