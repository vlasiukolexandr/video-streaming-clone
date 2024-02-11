import useCurrentUser from "@/hooks/useCurrentUser";
import { useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";

const ClientDataCard = () => {
  const { data: currentUser } = useCurrentUser();
  // const { currentUser } = useAppSelector(state => state.currentUser);

  return (
    <>
      <div className="text-2xl text-green-600">Test page</div>
      <div className="text-2xl text-green-600">{currentUser?.name}</div>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout</button>
    </>
  );
}

export default ClientDataCard;