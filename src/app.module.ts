import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    UserModule, RolesModule, AuthModule, ProjectModule
  ],
})
export class AppModule {}