import { useQuery } from "@tanstack/react-query";
import { getUser } from "../userApi";
import type { User } from "@/modules/Users/users";

const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};

export default useUser;
