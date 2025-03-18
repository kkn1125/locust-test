import { UserRelations as _UserRelations } from './user_relations';
import { ProfileRelations as _ProfileRelations } from './profile_relations';
import { User as _User } from './user';
import { Profile as _Profile } from './profile';

export namespace PrismaModel {
  export class UserRelations extends _UserRelations {}
  export class ProfileRelations extends _ProfileRelations {}
  export class User extends _User {}
  export class Profile extends _Profile {}

  export const extraModels = [UserRelations, ProfileRelations, User, Profile];
}
