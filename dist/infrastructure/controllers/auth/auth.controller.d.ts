import { AuthLoginDto } from './auth-dto.class';
import { IsAuthPresenter } from './auth.presenter';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';
export declare class AuthController {
    private readonly loginUsecaseProxy;
    private readonly logoutUsecaseProxy;
    private readonly isAuthUsecaseProxy;
    constructor(loginUsecaseProxy: UseCaseProxy<LoginUseCases>, logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>, isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>);
    login(auth: AuthLoginDto, request: any): Promise<string>;
    logout(request: any): Promise<string>;
    isAuthenticated(request: any): Promise<IsAuthPresenter>;
    refresh(request: any): Promise<string>;
}
