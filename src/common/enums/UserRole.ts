export const UserRole = {
  Active: 1,
  Inactive: 2,
  Report: 3,
  Delete: 4,
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
