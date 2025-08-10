import { BaseResponse, DataResponse } from "@/apis/config/type";
import fetchClient from "@/apis/config/fetchClient";

export function getUserApi(userId: string): Promise<DataResponse<User>> {
  return fetchClient({
    method: "GET",
    url: "/users/" + userId,
  });
}

export function updateUserApi(user: User): Promise<BaseResponse> {
  return fetchClient({
    method: "PUT",
    url: "/users/" + user.id,
    data: { ...user, account: undefined },
  });
}
