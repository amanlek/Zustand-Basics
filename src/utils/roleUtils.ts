export type Role = "admin" | "user" | "moderator";

export const hasAccess = (
  userRole: string | undefined,
  allowedRoles: string[],
) => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};