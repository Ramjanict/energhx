import { IconType } from "react-icons";

// Define a type for your user (example)
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define a type for your app's theme (example)
export type Theme = "light" | "dark";

// Define a type for your app's routes (example)
export type Route = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
};

// Define type for a single menu item
export interface MenuItem {
  path: string;
  label: string;
  icon: IconType;
}

// Define props type for Sidebar
export interface SidebarProps {
  menuItems: MenuItem[];
}
export interface ContinueButtonType {
  nextStep?: () => void;
  prevStep: () => void;
  className?: string;
  step?: number;
}

export interface FormList {
  formList?: string[];
}
export interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: { name: string; duration: string; price: number };
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    phone: string;
  };

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleOrderSubmit: (e: React.FormEvent) => void;

  handleNextOrder?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface OverViewProps {
  object: {
    title?: string;
    subTitle?: string;
    des: string;
    service: string[];
    note: string;
    button?: string;
    price?: number;
  };
  handleNext?: () => void;
}

export interface NavbarUserProps {
  name?: string;
  role: string;
  profileImg: string;
}
