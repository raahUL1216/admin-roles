import { AdminRepository } from "../../domain/repositories/adminRepository.interface";
import { Role } from "../../enums/role.enum";
export declare class createAdminUseCases {
    private readonly adminRepository;
    constructor(adminRepository: AdminRepository);
    execute(username: string, password: string, email: string, role: Role): Promise<void>;
}
