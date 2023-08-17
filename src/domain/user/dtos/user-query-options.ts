export abstract class UserQueryOptions {
  userId?: string;
  where?: {
    applicationId?: {
      hasSome?: string;
    };
  };
}
