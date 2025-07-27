"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { todos } from "@/db/schema";

export const getData = async (userId: number) => {
  const data = await db.select().from(todos).where(eq(todos?.userId, userId));
  return data;
};

export const addTodo = async (id: number, text: string, userId: number) => {
  try {
    await db.insert(todos).values({
      id,
      text: text,
      userId,
    });
    revalidatePath("/");
  } catch (error) {
    console.error('Erreur lors de l\'ajout du todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  await db.delete(todos).where(eq(todos.id, id));

  revalidatePath("/");
};

export const toggleTodo = async (id: number, done: boolean) => {
  await db
    .update(todos)
    .set({
      done: done,
    })
    .where(eq(todos.id, id));

  revalidatePath("/");
};

export const editTodo = async (id: number, text: string) => {
  await db
    .update(todos)
    .set({
      text: text,
    })
    .where(eq(todos.id, id));

  revalidatePath("/");
};
