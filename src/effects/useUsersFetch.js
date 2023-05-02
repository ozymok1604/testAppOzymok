import { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../api";
import { useContext } from "react";
import { UsersContext } from "../context";

export const useUsersFetch = (page) => {
  console.log(page);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios(BASE_URL + `?page=${page}&per_page=10`, {
        "access-token": ACCESS_TOKEN,
      });

      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      console.log("final");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return {
    isLoading,
    users,
  };
};
