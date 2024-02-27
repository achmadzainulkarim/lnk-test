import { ObjectId } from 'mongodb';

export interface UserInterface {
    _id : ObjectId,
    username : string,
    name : string,
    password : string,
    lastLogin : string
}