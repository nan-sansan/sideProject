import fetchClient from "@/apis/config/fetchClient";
import { BaseResponse } from "@/apis/config/type";

interface LoginResponse extends BaseResponse {
  token: string;
}

export function loginApi(
  username: string,
  password: string,
): Promise<LoginResponse> {
  return fetchClient({
    method: "POST",
    url: "public/auth/login",
    data: { username, password },
  });
}
