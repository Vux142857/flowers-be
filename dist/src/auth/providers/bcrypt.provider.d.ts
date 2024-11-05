import { HashingProvider } from './hashing.provider';
export declare class BcryptProvider implements HashingProvider {
    hash(value: string | Buffer): Promise<string>;
    compare(value: string | Buffer, encrypted: string): Promise<boolean>;
}
