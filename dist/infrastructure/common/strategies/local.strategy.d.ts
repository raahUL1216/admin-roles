import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from "../../exceptions/exceptions.service";
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly loginUsecaseProxy;
    private readonly logger;
    private readonly exceptionService;
    constructor(loginUsecaseProxy: UseCaseProxy<LoginUseCases>, logger: LoggerService, exceptionService: ExceptionsService);
    validate(username: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        role: import("../../../enums/role.enum").Role;
        createDate: Date;
        updatedDate: Date;
        lastLogin: Date;
        hashRefreshToken: string;
    }>;
}
export {};
