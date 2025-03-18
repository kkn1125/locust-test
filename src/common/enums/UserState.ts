export const UserState = {
  Active: 1,
  Inactive: 2,
  Report: 3,
  Delete: 4,
} as const;
export type UserState = (typeof UserState)[keyof typeof UserState];
