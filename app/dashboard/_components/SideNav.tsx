"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UsageTrack from "./UsageTrack";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SideNav() {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    // {
    //   name: "History",
    //   icon: FileClock,
    //   path: "/dashboard/history",
    // },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  const handleNavClick = (e: React.MouseEvent, menuPath: string) => {
    e.preventDefault();
    const action = menuPath.split("/").pop();
    if (action === "billing" || action === "settings") {
      setLoadingAction(action);
      setTimeout(() => {
        setLoadingAction(null);
        router.push(menuPath);
      }, 2000);
    } else {
      router.push(menuPath);
    }
  };

  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={60} height={60} />
        </Link>
      </div>
      <hr className="my-3 border" />
      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            onClick={(e) => handleNavClick(e, menu.path)}
          >
            <div
              className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg 
              cursor-pointer items-center
               ${path == menu.path && "bg-primary text-white"}`}
            >
              <menu.icon className="h-7 w-7" />
              <h2 className="text-lg">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      {/* <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div> */}
      {loadingAction && (
        <div className="fixed bottom-4 right-4 w-64">
          <Alert>
            {loadingAction === "billing" ? (
              <WalletCards className="h-4 w-4" />
            ) : (
              <Settings className="h-4 w-4" />
            )}
            <AlertTitle>
              {loadingAction === "billing"
                ? "Loading Billing"
                : "Loading Settings"}
            </AlertTitle>
            <AlertDescription>
              {loadingAction === "billing"
                ? "Preparing your billing information..."
                : "Preparing your settings page..."}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default SideNav;
