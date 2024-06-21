import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, RolesModule, AuthModule
  ],
})
export class AppModule {}