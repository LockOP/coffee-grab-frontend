"use client";
import Button from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex h-[100dvh] w-screen flex-col gap-6 items-center justify-end bg-[black] relative py-[40px] px-[30px] overflow-clip select-none">
      <div className="flex flex-col gap-2">
        <p className="text-[white] text-[34px] font-semibold tracking-[2px] leading-[125%] text-center">
          Coffee so good, your taste buds will love it.
        </p>
        <p className="text-[#A9A9A9] text-[14px] tracking-[1px] leading-[154%] text-center">
          The best grain, the finest roast, the powerful flavor.
        </p>
      </div>
      <div className="flex flex-row w-full z-10">
        <Button onClick={() => router.push("/otp-send")} label="Get Started" />
      </div>
      <img
        src="./images/landingPageBg.png"
        alt="No image found"
        className="absolute mix-blend-lighten object-contain min-w-[468px] min-h-[702px] top-0 -translate-y-12 pointer-events-none"
      />
    </div>
  );
}
