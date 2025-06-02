type Data = {
  email: string;
  id: string;
  userType: "SERVER" | "DEVELOPER" | "ADMIN" | string; // Adjust based on actual enum values
  status: "ACTIVE" | "INACTIVE" | string; // Adjust as needed
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type User = {
  id: string;
  email: string;
  userId: string;
  user: Data;
};
