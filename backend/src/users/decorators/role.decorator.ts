import { Reflector } from '@nestjs/core';
import { Roles } from '../enum/roles';

export const Role = Reflector.createDecorator<Roles>();