import axios from "axios";

const useGetOwnerData = ({
  setOwnerName,
  ownerId,
}: {
  setOwnerName: React.Dispatch<React.SetStateAction<string>>;
  ownerId: number;
}): (() => Promise<void>) => {
  const getOwnerName = async () => {
    if (ownerId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/members/${ownerId}`
        );
        const data = response.data;
        setOwnerName(data.results[0].nickname);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return getOwnerName;
};

export default useGetOwnerData;
