import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
export declare class createUserGroupUseCases {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(group_name: any): Promise<void>;
}
