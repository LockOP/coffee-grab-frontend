"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { log_in_redux, log_out_redux } from "@/redux/actions/userActions";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  //   const userDetails = useSelector((state: any) => state.userReducer);

  const router = useRouter();
  const pathname = usePathname();

  function isTokenExpired(token: string) {
    const decodedToken = jwtDecode(token);
    if (decodedToken && decodedToken.exp) {
      const currentTime = Date.now() / 1000;
      return currentTime > decodedToken.exp;
    }
    return true; // Consider expired if token is invalid or missing exp claim
  }

  useEffect(() => {
    // function func2() {
    //   dispatch(log_out_redux());
    // }
    const tkinter = localStorage.getItem("tkinter");
    if (!tkinter) {
      //   handleLogout(func2);
      //   router.replace("/login");
      console.log("no token");
    } else {
      if (isTokenExpired(tkinter)) {
        console.log("token expired");
        // handleLogout(func2);
        // router.replace("/login");
      } else {
        console.log("token not expired", tkinter);
      }
    }
    // if (!userDetails.userName) {
    // //   handleLogout(func2);
    //   router.replace("/login");
    // }
  });

  return children;
}
