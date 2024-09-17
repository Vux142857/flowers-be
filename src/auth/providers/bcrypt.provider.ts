import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

export class BcryptProvider implements HashingProvider {
  async hash(value: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
  }

  async compare(value: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compareSync(value, encrypted);
  }
}
