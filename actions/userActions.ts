"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};

export const getUser = async (userId: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId));

  return user;
};

export const addUser = async (user: {
  clerkId: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  photo: string;
}) => {
  await db
    .insert(users)
    .values({
      clerkId: user.clerkId,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
    })
    .returning({ clerkClientId: users.clerkId });

  revalidatePath("/");
};