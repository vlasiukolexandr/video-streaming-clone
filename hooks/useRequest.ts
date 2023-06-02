import { Requests } from "@/lib/requests";

const baseURL = '';

export const useRequests = () => {
  const request = new Requests(baseURL);

  return {
    post: request.post
  }
}