import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserRepository } from "../../domain/repositories/userRepositary.interface";
import { UserM } from "../../domain/model/user";
export declare class DatabaseUserRepository implements UserRepository {
    private readonly userEntityRepository;
    constructor(userEntityRepository: Repository<User>);
    updateRefreshToken(username: string, refreshToken: string): Promise<void>;
    getUserByUsername(username: string): Promise<UserM>;
    updateLastLogin(username: string): Promise<void>;
    private toUser;
    private toUserEntity;
}
