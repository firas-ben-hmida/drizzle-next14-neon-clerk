export type todoType = {
  id: number;
  text: string;
  done: boolean;
  userId: number;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
};
