import { User } from "@/types/User";
import axios from "axios";

const useGetUserData = ({
  setUser,
  memberId,
}: {
  setUser: React.Dispatch<React.SetStateAction<User>>;
  memberId: number;
}): (() => Promise<void>) => {
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/members/${memberId}`
      );
      // console.log(response);
      const data = response.data;
      setUser(data.results[0]);
    } catch (e) {
      console.log(e);
    }
  };
  return getUserData;
};

export default useGetUserData;
