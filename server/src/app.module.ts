import { Module } from '@nestjs/common';
import { CreateUserController } from './Infrastructure/Controllers/User/CreateUserController';
import { CreateUserHandler } from './Application/User/CreateUserHandler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModel } from './Infrastructure/Persistance/Models/UserModel';
import { USERS_REPOSITORY } from './Constants';
import { PgUserRepository } from './Infrastructure/Persistance/Repositories/PgUserRepository';
import { UserMapper } from './Infrastructure/Persistance/Mappers/UserMapper';

const controllers = [CreateUserController];

const handlers = [CreateUserHandler];

const repositories = [
  {
    provide: USERS_REPOSITORY,
    useClass: PgUserRepository,
  },
];

const mappers = [UserMapper];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [UserModel],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [...controllers],
  providers: [...handlers, ...repositories, ...mappers],
})
export class AppModule {}
