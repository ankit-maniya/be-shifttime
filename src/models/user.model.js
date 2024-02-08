"use strict"

/*** Third Party Packages ***/
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import bcrypt from "bcrypt"

/*** Customs ***/
import constant from '../global/constant.js'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  role: {
    type: String,
    enum: [constant.SUPERADMIN, constant.ADMIN, constant.EMPLOYEE],
    default: constant.EMPLOYEE
  },
  lastName: {
    type: String
  },
  clientId: {
    type: Number
  },
  stripeId: {
    type: String
  },
  subscription: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  country: {
    type: String
  },
  birthdate: {
    type: String
  },
  height: {
    type: String
  },
  weight: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  mobile: {
    type: Number,
  },
  countryCode: {
    type: Number
  },
  emergencyContactName: {
    type: String
  },
  emergencyContactNumber: {
    type: String
  },
  profileImage: {
    type: String
  },
  allImages: {
    type: Array
  },
  subscription: {
    type: [JSON]
  },
  createdOn: {
    type: Number
  },
  updatedOn: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  loginWith: {
    type: Number,
    enum: [0, 1, 2], /*** [ 0 => mobile or email, 1 => google, 2 => facebook ] ***/
    default: 0
  },
  isFirstTimeLogin: {
    type: Boolean,
    default: true
  },
  plan: {
    type: String,
    enum: [constant.TRIAL, constant.SILVER, constant.GOLD],
  },
  expiry: {
    type: String,
  },
}, { timestamps: true, strict: false })

userSchema.pre("save", async function () {
  this.password = await this.generatePasswordHash()
})

userSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10
  return await bcrypt.hash(this.password, saltRounds)
}

export const validatePassword = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword)
}

/*** Initalize Plugin For Paginate ***/
userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema)

export default User