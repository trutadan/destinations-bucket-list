export interface UserRegistration {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface UserAccount {
  first_name: string;
  last_name: string;
  username: string;
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
