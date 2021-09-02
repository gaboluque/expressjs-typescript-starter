import { Document } from 'mongoose';

export interface IUserContext {
  confirmationToken?: string;
  notificationToken?: string;
  restorePasswordToken?: string;
  confirmedAt?: Date;
  confirmationSentAt?: Date;
  restorePasswordSentAt?: Date;
}

export interface IUserDTO {
  email?: string;
  password?: string;
  name?: string;
}

export interface IUser {
  _id: string;
  id: number;
  email: string;
  password?: string;
  name: string;
  userContext: IUserContext;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IUserDoc extends Omit<IUser, '_id'>, Omit<Document, 'id'> {
  createdAt: Date;
}
