import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { GetUserHandler } from 'src/Application/GetUser/GetUserHandler';
import { UserSession } from 'src/Types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly getUserHandler: GetUserHandler,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const authorizationHeader = request.header('Authorization');
      const token = authorizationHeader.replace('Bearer ', '');

      request.userToken = token;

      const userToken = this.verifyUser(token);

      const user = await this.getUser(userToken);

      request.authenticatedUser = user;

      return true;
    } catch (error: any) {
      return false;
    }
  }

  private verifyUser(token: string): UserSession {
    return jwt.verify(token, this.config.get<string>('JWT_KEY')) as UserSession;
  }

  private async getUser(userSession: UserSession): Promise<any> {
    const user = await this.getUserHandler.execute({ id: userSession.id });
  }
}
