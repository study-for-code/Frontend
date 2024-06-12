import axios from "axios";

const useGetUserData = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}): (() => Promise<void>) => {
  const getUserData = async () => {
    try {
      const response = await axios.get("/user");
      const data = response.data;
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };
  return getUserData;
};

export default useGetUserData;
