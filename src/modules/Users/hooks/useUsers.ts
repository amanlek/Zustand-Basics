import { getUsers } from "@/modules/Users/userApi";
import type { UsersResponse } from "@/types/users";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  return useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  });
};

export default useUsers;
