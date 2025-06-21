export type User = {
  id: string;
  firstName: string;
  email: string;
};

export type Program = {
  id: string;
  title: string;
};

export type PaymentDataItem = {
  paymentStatus: string | null;
  paymentIntentId: string | null;
  paymentMethod: string | null;
  invoiceUrl: string | null;
  status: string;
  userId: string;
  programId: string;
  createdAt: string;
  updatedAt: string | null;
  user: User;
  program: Program;
};
