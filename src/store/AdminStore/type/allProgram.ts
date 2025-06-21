export type AllProgram = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  publishedFor: "DEVELOPER" | "SERVER";
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};
