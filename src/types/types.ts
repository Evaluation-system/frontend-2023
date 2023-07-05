export interface IUserData {
  email: string;
  password: string;
}
export interface IResponseUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}

export interface IResponseUserData {
  token: string;
  user: IResponseUser;
}

export interface IUser {
  id: number;
  email: string;
  token: string;

  // name: string;
  // phone: string;
  // photo: string;
}

type Pricing = {
  cost: string;
  value: number;
};

type Tasks = {
  task: string;
  time: number;
};

type employeePayments = {
  employee: string;
  salary: number;
};

export interface ICreateProject {
  title: string;
  description: string;
  UserId: number;
  pathImage: string;
}

export interface IProject {
  id: number;
  User?: IUser;
  UserID?: number;
  title: string;
  description: string;
  procing: Pricing[];
  tasks: Tasks[];
  employeePayments: employeePayments[];
  pathImage: string;
}
