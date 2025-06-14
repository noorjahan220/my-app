"use server";

import { hash } from "bcryptjs";
import dbConnect, { collectionNamesObj } from "../../../lib/mongoDBConnect";

export async function registerUser({ name, email, password }) {
  try {
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      return {
        success: false,
        message: "Name, email, and password are required",
      };
    }

    const userCollection = await dbConnect(collectionNamesObj.userCollection);

    // Check if user already exists
    const existingUser = await userCollection.findOne({ email: trimmedEmail });
    if (existingUser) {
      return {
        success: false,
        message: "Email already registered",
      };
    }

    const hashedPassword = await hash(password, 12);

    // Create user document
    const newUser = {
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const insertResult = await userCollection.insertOne(newUser);

    if (!insertResult.acknowledged) {
      return {
        success: false,
        message: "Failed to register user",
      };
    }

    return {
      success: true,
      message: "User registered successfully",
      user: {
        id: insertResult.insertedId.toString(),
        name: trimmedName,
        email: trimmedEmail,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}