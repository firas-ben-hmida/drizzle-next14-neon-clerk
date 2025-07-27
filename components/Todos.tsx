"use client";
import { FC, useState } from "react";
import { todoType, UserType } from "@/types/todoType";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "@/actions/todoActions";

interface Props {
  todos: todoType[];
  user: UserType;
}

const Todos: FC<Props> = ({ todos , user }) => {
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);

  const createTodo = async (text: string) => {
    try {
      if (!user?.id) {
        throw new Error('ID utilisateur manquant');
      }
      
      await addTodo(text, user.id);
      const newId = (todoItems.at(-1)?.id || 0) + 1;
      setTodoItems((prev) => [...prev, { id: newId, text, done: false, userId: user.id }]);
    } catch (error) {
      console.error('Erreur lors de la création du todo:', error);
      alert('Erreur lors de la création du todo. Veuillez réessayer.');
    }
  };

  const changeTodoText = async (id: number, text: string) => {
    try {
      setTodoItems((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
      );
      await editTodo(id, text);
    } catch (error) {
      console.error('Erreur lors de la modification du todo:', error);
      alert('Erreur lors de la modification du todo. Veuillez réessayer.');
    }
  };

  const toggleIsTodoDone = async (id: number, done: boolean) => {
    try {
      setTodoItems((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, done } : todo))
      );
      await toggleTodo(id, done);
    } catch (error) {
      console.error('Erreur lors du toggle du todo:', error);
      alert('Erreur lors du toggle du todo. Veuillez réessayer.');
    }
  };

  const deleteTodoItem = async (id: number) => {
    try {
      setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
      await deleteTodo(id);
    } catch (error) {
      console.error('Erreur lors de la suppression du todo:', error);
      alert('Erreur lors de la suppression du todo. Veuillez réessayer.');
    }
  };

  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="text-5xl font-medium">To-do app</div>
      <div className="w-full flex flex-col mt-8 gap-2">
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      <AddTodo createTodo={createTodo} />
    </main>
  );
};

export default Todos;
