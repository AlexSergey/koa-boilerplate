import { compare, hash } from 'bcrypt';

export class UserEntity {
  private _password: string;

  constructor(private readonly _email: string, private readonly _name: string, passwordHash?: string) {
    if (passwordHash) {
      this._password = passwordHash;
    }
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this._password);
  }

  public async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }
}
