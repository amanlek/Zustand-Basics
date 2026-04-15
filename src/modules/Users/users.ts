
export interface User {
  username: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: number;
  address?: Address;
  role: string;
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
