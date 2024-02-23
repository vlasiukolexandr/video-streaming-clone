import { User, Movie } from "@prisma/client";
import { Requests } from "./requests";

const fetcher = async (url: string): Promise<User | Movie | Movie[] | undefined> => {
  const request = new Requests();
  let response = undefined;
  try {
    const { data } = await request.get<User>(url);
    response = data;
  } catch (error) {
    throw new Error((error as Error).message);
  }

  return response;
}

export default fetcher;
