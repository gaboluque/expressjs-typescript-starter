import mongoose from 'mongoose';

export type MongoId = mongoose.Types.ObjectId;

export interface LooseObject {
  [key: string]: any;
}
export interface IPaginationObj {
  sort: LooseObject;
  page: number;
  limit: number;
}

export interface IPagination {
  query: LooseObject;
  pagination: IPaginationObj;
}
