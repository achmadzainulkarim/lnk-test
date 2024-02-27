import { ObjectId } from 'mongodb';

export interface EmailInterface {
    _id : ObjectId | null,
    email : string,
    date : Date,
    description : string,
}