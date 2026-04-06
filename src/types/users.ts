
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: Address;

}

interface Address{
  address: string;
  city: string;
  state: string;
  postalCode: number;
  country: number;
}

export interface UsersResponse {
  users: User[];
}
