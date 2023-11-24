import { CreateUserDTO } from 'src/users/dtos/CreateUserDTO';

type Override = Partial<CreateUserDTO>;

export function makeUser(override: Override = {}) {
  return {
    name: 'user test',
    email: 'usertest@email.com',
    password: 'passwordtest',
    balance: 0,
    ...override,
  };
}
