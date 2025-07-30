import fetchClient from "@/apis/config/fetchClient";
import { BaseResponse } from "@/apis/config/type";

type LoginResponse = {
  content: { accessToken: string; refreshToken: string };
} & BaseResponse;

export function loginApi(
  account: string,
  password: string,
): Promise<LoginResponse> {
  return fetchClient({
    method: "POST",
    url: "public/login",
    data: { account, password },
  });
}
