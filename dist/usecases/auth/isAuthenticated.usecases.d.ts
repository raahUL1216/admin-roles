export declare class IsAuthenticatedUseCases {
    private readonly adminUserRepo;
    constructor(adminUserRepo: any);
    execute(username: string): Promise<any>;
}
