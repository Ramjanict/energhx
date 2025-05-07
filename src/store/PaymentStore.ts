import { create } from "zustand";

type PaymentStore = {
  isOrderModalOpen: boolean;
  showHand: boolean;
  showPaymentModal: (data: boolean) => void;
  handleNextOrder: (data: boolean) => void;
};

export const usePaymentStore = create<PaymentStore>((set) => ({
  isOrderModalOpen: false,
  showHand: false,

  showPaymentModal: (data) => {
    set({ isOrderModalOpen: data });
  },
  handleNextOrder: (data) => {
    set({ showHand: data });
  },
}));
