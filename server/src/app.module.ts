import { Module } from '@nestjs/common';
import { CreateUserController } from './Infrastructure/Controllers/User/CreateUserController';
import { CreateUserHandler } from './Application/User/CreateUserHandler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const controllers = [CreateUserController];

const handlers = [CreateUserHandler];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [...controllers],
  providers: [...handlers],
})
export class AppModule {}
