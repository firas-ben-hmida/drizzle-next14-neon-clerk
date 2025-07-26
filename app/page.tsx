import Image from "next/image";
import { getData } from "@/actions/todoActions";
import Todos from "@/components/Todos";
import { getAllUsers } from "@/actions/userActions";

export default async function Home() {
  //const users= await getAllUsers();
  //const data= await getData(users[0].id);
  return (
      <main className="flex items-center justify-between">
       
      </main>
  );
}
