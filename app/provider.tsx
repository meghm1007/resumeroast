"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "./_context/UserDetailContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    user && VerifyUser();
  }, [user]);

  const VerifyUser = async () => {
    const dataResult = await axios.post("/api/verify-user", {
      user: user,
    });
    setUserDetail(dataResult.data.result);
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail, getUserDetail: VerifyUser }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
        {children}
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
