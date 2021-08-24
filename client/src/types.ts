export interface Journal {
  _id: string;
  date: Date;
  content: string;
}

export interface IJournal {
  date: Date;
  content: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface NewUserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}
