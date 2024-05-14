"use client";

import { useState } from "react";
import { send_otp_api } from "@/services/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/button";

export default function Page(): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.value.length > 10) return;
    setPhoneNumber(e.target.value);
  }

  async function sendOtp(
    e?: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    try {
      const response = await send_otp_api({
        countryCode: "+91",
        phoneNumber,
      });
      console.log(response);
      if (response.message === "pending") {
        sessionStorage.setItem("phoneNumber", phoneNumber);
        router.push("/otp-confirm");
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
            OTP Verification
          </p>
          <p className="text-textGrey text-[16px] tracking-[1px] leading-[154%] text-left">
            Enter phone number to send one time password.
          </p>
        </span>

        <div className="w-full relative overflow-visible flex flex-row items-center group">
          <div
            className={`absolute left-0 translate-x-4 group-focus-within:text-sm text-primary select-none pointer-events-none z-10 group-focus-within:-translate-y-[calc(16px+70%)] bg-white ani ${
              phoneNumber.length == 0
                ? "translate-y-0 text-[16px]"
                : "-translate-y-[calc(16px+70%)] text-sm"
            }`}
          >
            <p className="px-2">Phone Number</p>
          </div>
          <div className="absolute left-0 translate-x-4 text-textGrey">+91</div>
          <input
            autoComplete="off"
            type="number"
            value={phoneNumber}
            onChange={handleInputChange}
            className="w-full border border-primary box-border h-[62px] outline-none rounded-2xl p-4 text-[16px] pl-12"
          />
        </div>
      </div>
      <div className="flex flex-row w-full z-10">
        <Button onClick={() => sendOtp()} label="Send OTP" />
      </div>
    </div>
  );
}
