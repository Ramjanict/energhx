type Program = {
  id: string;
  thumbnail: string;
  description: string;
  title: string;
  price: number;
  publishedFor: string;
  createdAt: string;
  updatedAt: string;
};

export type Myprogram = {
  status: "BASIC" | string;
  program: Program;
};
