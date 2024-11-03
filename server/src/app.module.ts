import { Module } from '@nestjs/common';
import { CreateUserHandler } from './Application/CreateUser/CreateUserHandler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModel } from './Infrastructure/Persistance/Models/UserModel';
import { MESSAGES_REPOSITORY, USERS_REPOSITORY } from './Constants';
import { PgUserRepository } from './Infrastructure/Persistance/Repositories/PgUserRepository';
import { UserMapper } from './Infrastructure/Persistance/Mappers/UserMapper';
import { CryptoService } from './Domain/Services/CryptoService';
import { SignInHandler } from './Application/SignIn/SignInHandler';
import { SignInController } from './Infrastructure/Controllers/SignIn/SignInController';
import { CreateUserController } from './Infrastructure/Controllers/CreateUser/CreateUserController';
import { GetUserHandler } from './Application/GetUser/GetUserHandler';
import { GetUserController } from './Infrastructure/Controllers/GetUser/GetUserController';
import { UpdateUserHandler } from './Application/UpdateUser/UpdateUserHandler';
import { UpdateUserController } from './Infrastructure/Controllers/UpdateUser/UpdateUserController';
import { ActivateUserController } from './Infrastructure/Controllers/ActivateUser/ActivateUserController';
import { GetActiveUsersHandler } from './Application/GetActiveUsers/GetActiveUsersHandler';
import { GetActiveUsersController } from './Infrastructure/Controllers/GetActiveUsers/GetActiveUsersController';
import { SaveMessageHandler } from './Application/SaveMessage/SaveMessageHandler';
import { SaveMessageController } from './Infrastructure/Controllers/SaveMessage/SaveMessageController';
import { MessageModel } from './Infrastructure/Persistance/Models/MessageModel';
import { PgMessageRepository } from './Infrastructure/Persistance/Repositories/PgMessageRepository';
import { MessageMapper } from './Infrastructure/Persistance/Mappers/MessageMapper';
import { GetMessagesHandler } from './Application/GetMessages/GetMessagesHandler';
import { GetMessagesController } from './Infrastructure/Controllers/GetMessages/GetMessagesController';
import { SaveNotificationHandler } from './Application/SaveNotification/SaveNotificationHandler';
import { UuidService } from './Domain/Services/UuidService';
import { GetNotificationsHandler } from './Application/GetNotifications/GetNotificationsHandler';
import { GetNotificationsController } from './Infrastructure/Controllers/GetNotifications/GetNotificationsController';
import { NotificationModel } from './Infrastructure/Persistance/Models/NotificationModel';

const controllers = [
  CreateUserController,
  SignInController,
  GetUserController,
  UpdateUserController,
  ActivateUserController,
  GetActiveUsersController,
  SaveMessageController,
  GetMessagesController,
  GetNotificationsController,
];

const handlers = [
  CreateUserHandler,
  SignInHandler,
  GetUserHandler,
  UpdateUserHandler,
  GetActiveUsersHandler,
  SaveMessageHandler,
  GetMessagesHandler,
  SaveNotificationHandler,
  GetNotificationsHandler,
];

const repositories = [
  {
    provide: USERS_REPOSITORY,
    useClass: PgUserRepository,
  },
  {
    provide: MESSAGES_REPOSITORY,
    useClass: PgMessageRepository,
  },
];

const mappers = [UserMapper, MessageMapper];

const services = [CryptoService, UuidService];

const models = [UserModel, MessageModel, NotificationModel];

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
        entities: models,
        synchronize: false,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(models),
  ],
  controllers: [...controllers],
  providers: [...handlers, ...repositories, ...mappers, ...services],
})
export class AppModule {}
