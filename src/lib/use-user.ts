import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import { ATTENDANCE_API_DOMAIN } from "@/constants/axios-constant";

const studentFetcher = () =>
  axios
    .get(`${ATTENDANCE_API_DOMAIN}/student/get-info`, {
      headers: {
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
    .then((response) => response.data);

export default function useUser() {
  const { data, mutate, error } = useSWR(
    "/api/student/get-info",
    studentFetcher
  );

  const isLoading = !data && !error;

  return {
    isLoading,
    error,
    student: data,
    mutate,
  };
}
