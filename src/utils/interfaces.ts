export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: { street: string; city: string };
}
