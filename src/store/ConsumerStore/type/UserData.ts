type State = {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
};
export type Country = {
  name: string;
  code: string;
  id: string;
  states: State[];
};

type SubBuildings = {
  name: string;
  id: string;
};

type Buildings = {
  name: string;
  id: string;
  subBuildings: SubBuildings[];
};

export interface UserData {
  alternatePhoneNumber: string | null;
  userType: string;
  isVerified: boolean;
  buildings: Buildings;
  id: string;
  firstname: string;
  lastname: string;
  othername: string;
  email: string;
  phoneNumber: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
  userTypeId: string;
  userRole: string;
  profile_photo: string | null;
  country: Country;
  password: string | null;
}
