export const UserRole = {
  User: 1,
  Shopkeeper: 2,
  Admin: 3,
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
