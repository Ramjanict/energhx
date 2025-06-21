export type AllAdmin = {
  id: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  canAccess: "DEVELOPER" | "SERVER";
  userId: string;
  thumbnail: string;
};
