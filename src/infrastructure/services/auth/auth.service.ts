import { Injectable } from "@nestjs/common";
import { IAuthService } from "src/domain/adapters/auth.interface";

@Injectable()
export class AuthService implements IAuthService {
  constructor() {}
}
