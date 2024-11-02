import { User } from 'src/Domain/Entities/User';
import { UserModel } from '../Models/UserModel';

export class UserMapper {
  public toModel(entity: User): UserModel {
    const model = new UserModel();

    model.id = entity.id();
    model.name = entity.name();
    model.email = entity.email();
    model.password = entity.password();
    model.isActive = entity.isActive();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    return model;
  }

  public toDomain(model: UserModel): User {
    return new User(
      model.id,
      model.name,
      model.email,
      model.password,
      model.isActive,
      model.createdAt,
      model.updatedAt,
    );
  }
}
