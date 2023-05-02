import axios from "axios";
import { useState } from "react";
import { ACCESS_TOKEN, BASE_URL } from "../api";

export const useUserUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUserUpdate = async (userId, newData) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `${BASE_URL}/${userId}`,

        data: {
          "access-token": ACCESS_TOKEN,
          ...newData,
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleUserUpdate,
    isLoading,
  };
};
