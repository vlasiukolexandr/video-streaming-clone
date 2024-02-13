import NavBar from "@/components/NavBar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import Billboard from "./components/Billboard";

const ClientDataCard = () => {
  const { data: currentUser } = useCurrentUser();
  // const { currentUser } = useAppSelector(state => state.currentUser);

  return (
    <>
      <NavBar />
      <Billboard />
      {/* <div className="text-2xl text-green-600">Test page</div>
      <div className="text-2xl text-green-600">{currentUser?.name}</div>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout</button> */}
    </>
  );
}

export default ClientDataCard;