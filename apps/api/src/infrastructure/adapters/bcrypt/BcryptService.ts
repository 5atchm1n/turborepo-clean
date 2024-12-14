import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { IHashService } from "../../../core";

@Injectable()
export class BcryptService implements IHashService {
  private readonly SALT_ROUNDS = 10;

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.SALT_ROUNDS);
  }

  async compare(value: string, hashValue: string): Promise<boolean> {
    return await bcrypt.compare(value, hashValue);
  }
}
