import { useEffect, useState } from "react";

function useLoggedInUser() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  // get user
  useEffect(() => {
    if (token) {
      fetch(`${process.env.VITE_API_KEY_URL}/api/user/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data?.data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);
  return [users, isLoading];
}

export default useLoggedInUser;
