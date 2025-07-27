import { getData } from "@/actions/todoActions";
import { getAllUsers, getUser, addUser } from "@/actions/userActions";
import Todos from "@/components/Todos";
import { currentUser } from "@clerk/nextjs/server";
import { UserType } from "@/types/todoType";

export default async function Home() {
  const user = await currentUser();
  if (!user) return;
  
  const fetchedData = await getUser(user?.id);
  console.log(fetchedData);

  if (!fetchedData || fetchedData.length === 0) {
    try {
      await addUser({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        name: user.username || user.firstName || 'User',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        photo: user.imageUrl || '',
      });
      
      const newFetchedData = await getUser(user?.id);
      if (newFetchedData && newFetchedData.length > 0) {
        const todos = await getData(newFetchedData[0].id);
        return (
          <main className="flex items-center justify-between">
            <Todos todos={todos} user={newFetchedData[0] as UserType} />
          </main>
        );
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
    }

    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bienvenue !</h1>
          <p className="text-gray-600">Votre compte est en cours de création...</p>
          <p className="text-sm text-gray-500 mt-2">Utilisateur Clerk ID: {user.id}</p>
        </div>
      </main>
    );
  }

  const todos = await getData(fetchedData[0].id);

  return (
    <main className="flex items-center justify-between">
      <Todos todos={todos} user={fetchedData[0] as UserType} />
    </main>
  );
}