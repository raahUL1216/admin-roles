import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/role.enum";

export const Roles = (...args: Role[]) => SetMetadata("roles", args);
