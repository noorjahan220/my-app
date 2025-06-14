"use server";

import bcrypt from "bcryptjs";
import dbConnect, { collectionNamesObj } from "../../../lib/mongoDBConnect";

export const loginUser = async (payload) => {
  try {
    const email = payload.email?.trim();
    const password = payload.password;

    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    const userCollection = await dbConnect(collectionNamesObj.userCollection);
    const user = await userCollection.findOne({ email });

    if (!user) {
      // Generic message to avoid user enumeration
      return { success: false, error: "Invalid email or password" };
    }

    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) {
      return { success: false, error: "Invalid email or password" };
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
