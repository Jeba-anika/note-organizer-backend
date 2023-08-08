/* eslint-disable no-unused-vars */
import { Model, ObjectId, Types } from 'mongoose'

export type IUser = {
  _id: ObjectId
  email: string
  password: string
  role: 'user'
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'role' | 'email' | 'password'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
