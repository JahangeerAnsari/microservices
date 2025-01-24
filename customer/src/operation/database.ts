import mongoose from "mongoose";
import { BASE_URL } from "../config";

export default async () => {
  try {
    await mongoose.connect(BASE_URL).then(() => {
      console.log(" database connection successful");
    });
  } catch (error) {
    console.log("error on db connection", error);
  }
};
