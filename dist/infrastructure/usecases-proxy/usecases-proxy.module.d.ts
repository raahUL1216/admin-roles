import { DynamicModule } from "@nestjs/common";
export declare class UsecasesProxyModule {
    static LOGIN_USECASES_PROXY: string;
    static IS_AUTHENTICATED_USECASES_PROXY: string;
    static LOGOUT_USECASES_PROXY: string;
    static CREATE_ADMIN_USECASES_PROXY: string;
    static CREATE_ADMIN__GROUP_USECASES_PROXY: string;
    static ADD_ADMIN_TO_GROUP_USECASES_PROXY: string;
    static register(): DynamicModule;
}
