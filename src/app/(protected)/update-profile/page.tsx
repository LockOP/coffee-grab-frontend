"use client";

import { update_user_redux } from "@/redux/actions/userActions";
import { update_user_api } from "@/services/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>("");
  const userDetails = useSelector((state: any) => state.userReducer.user);

  async function update_user() {
    try {
      const response = await update_user_api({
        firstName: firstName,
      });
      dispatch(update_user_redux(response.user));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p>{JSON.stringify(userDetails)}</p>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <button onClick={() => update_user()}>Update</button>
      <button
        onClick={() => {
          router.push("/home");
        }}
      >
        Skip
      </button>
    </div>
  );
}
