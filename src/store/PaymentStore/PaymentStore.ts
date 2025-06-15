import { create } from "zustand";

type usePaymentStore = {
  isBookingModalOpen: boolean;
  isPaymentModalOpen: boolean;
  isHandShakeOpen: boolean;
  showBookingModal: () => void;
  closeBookingModal: () => void;
  showPayment: () => void;
  closePayment: () => void;
  handleHandShake: (data: boolean) => void;
};

export const usePaymentStore = create<usePaymentStore>((set) => ({
  isBookingModalOpen: false,
  isHandShakeOpen: false,
  isPaymentModalOpen: false,
  showBookingModal: () => {
    set({ isBookingModalOpen: true });
  },

  closeBookingModal: () => {
    set({ isBookingModalOpen: false });
  },

  showPayment: () => {
    set({ isPaymentModalOpen: true });
  },
  closePayment: () => {
    set({ isPaymentModalOpen: false });
  },

  handleHandShake: (data) => {
    set({ isHandShakeOpen: data });
  },
}));
