import { User, UserUpdate } from "@/types/userDetailsTypes";
import axios from "axios";
const current_endpoint = process.env.API_ENDPOINT;

export async function send_otp_api(payload: {
  countryCode: string;
  phoneNumber: string;
}): Promise<{
  message: string;
  verification: object;
}> {
  //   | { error: string; errorDetails?: object }
  const axiosoptions = {
    url: `${current_endpoint}/user/send-otp`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: payload,
  };
  const response = await axios(axiosoptions);
  return response.data;
}

export async function verify_otp_and_login_api(payload: {
  countryCode: string;
  phoneNumber: string;
  code: string;
}): Promise<{
  token: string;
  user: User;
}> {
  const axiosoptions = {
    url: `${current_endpoint}/user/verify-and-login`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: payload,
  };
  const response = await axios(axiosoptions);
  return response.data;
}

export async function update_user_api(payload: UserUpdate): Promise<{
  user: User;
}> {
  const axiosoptions = {
    url: `${current_endpoint}/client/updateProfile`,
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      authorization: localStorage.getItem("tkinter"),
    },
    data: payload,
  };
  const response = await axios(axiosoptions);
  return response.data;
}
