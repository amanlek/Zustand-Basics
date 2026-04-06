import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/modules/Users/userApi";
import type { User } from "@/types/users";

const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};

export default useUser;
