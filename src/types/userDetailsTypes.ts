interface User {
  countryCode: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  defaultAddress: Address | null;
  orderIds: id[]
  favourites: id[];
  addresses: Address[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

type id = string;

interface UserUpdate {
  firstName?: string;
  lastName?: string;
  profilePic?: string;
  defaultAddress?: Address | null;
  favourites?: id[];
  addresses?: Address[];
}

interface Address {
  houseNo: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pinCode: number;
  optional: string;
}

export type { User, UserUpdate, Address };
