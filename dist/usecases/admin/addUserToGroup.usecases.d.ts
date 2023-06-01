import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
export declare class addUserToGroupUseCases {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(group_id: number, user_ids: number[]): Promise<void>;
}
