import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    UserModule, RolesModule
  ],
})
export class AppModule {}