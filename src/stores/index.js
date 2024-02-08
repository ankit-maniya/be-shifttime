"use strict"

/*** Third Party Packages ***/
import mongoose from "mongoose"
import UserStore from "./collections/user.store.js"

/*** Config ***/
import { config } from "../configs/index.js"
const connectDB = () => {
    /*** Apply Connection With DB ***/
    return mongoose.connect(config.MONGO_URL)
}

export default connectDB

export {
    UserStore
}