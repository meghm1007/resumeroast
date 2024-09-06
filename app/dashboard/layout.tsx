import React from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="bg-white h-screen">
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default layout;