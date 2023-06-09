import { ValidRoles } from './../interfaces/validroles.interface';
import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';


export const RoleProtected = (...args: ValidRoles[] ) => {
    return SetMetadata( META_ROLES , args);
}