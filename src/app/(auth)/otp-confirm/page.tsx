"use client";

import { useState } from "react";
import { send_otp_api, verify_otp_and_login_api } from "@/services/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { update_user_redux } from "@/redux/actions/userActions";
import { useDispatch } from "react-redux";
import Button from "@/components/button";

export default function Page(): React.ReactNode {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [code, setCode] = useState<string>("");
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.value.length > 6) return;
    setCode(e.target.value);
  }

  async function verifyAndLogin(
    e?: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    try {
      let response;
      const phoneNumber = sessionStorage.getItem("phoneNumber");
      if (phoneNumber) {
        response = await verify_otp_and_login_api({
          countryCode: "+91",
          phoneNumber: phoneNumber,
          code,
        });
      } else {
        router.push("/otp-send");
      }

      console.log(response);
      if (response?.token) {
        localStorage.setItem("tkinter", response.token);
        dispatch(update_user_redux(response.user));
        router.push("/update-profile");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-[100dvh] w-screen flex-col gap-6 items-center justify-between bg-[white] relative py-[40px] px-[30px] overflow-clip select-none">
      <div className="flex flex-col gap-10">
        <span className="flex flex-col gap-2 w-full">
          <p className="text-textBlack text-[20px] font-semibold tracking-[1px] leading-[154%] text-left">
            Confirm OTP
          </p>
          <p className="text-textGrey text-[16px] tracking-[1px] leading-[154%] text-left">
            We have sent the 6-digit one time password on your specified phone number.
          </p>
        </span>

        <div className="w-full relative overflow-visible flex flex-row items-center group">
          <div
            className={`absolute left-0 translate-x-4 group-focus-within:text-sm text-primary select-none pointer-events-none z-10 group-focus-within:-translate-y-[calc(16px+70%)] bg-white ani ${
              code.length == 0
                ? "translate-y-0 text-[16px]"
                : "-translate-y-[calc(16px+70%)] text-sm"
            }`}
          >
            <p className="px-2">OTP</p>
          </div>
          <input
            autoComplete="off"
            type="number"
            value={code}
            onChange={handleInputChange}
            className="w-full border border-primary box-border h-[62px] outline-none rounded-2xl p-4 text-[16px]"
          />
        </div>
      </div>
      <div className="flex flex-row w-full z-10">
        <Button onClick={() => verifyAndLogin()} label="Verify OTP" />
      </div>
    </div>
  );
}
