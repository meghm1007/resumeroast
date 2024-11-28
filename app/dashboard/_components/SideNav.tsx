"use client";

import {
  FileChartLine,
  FileClock,
  Home,
  Settings,
  WalletCards,
} from "lucide-react";
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
    {
      name: "My Documents",
      icon: FileChartLine,
      path: "/dashboard/documents",
    },
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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoadingAction("logo");
    setTimeout(() => {
      setLoadingAction(null);
      router.push("/");
    }, 9000);
  };

  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Link href="/" onClick={handleLogoClick}>
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
        <div className="fixed bottom-4 left-4 z-50">
          <Alert className="bg-black text-white border-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <div className="bg-white rounded-full p-1">
              <Image src="/logo.svg" alt="Home" width={20} height={20} />
            </div>
            <div>
              <AlertTitle className="text-sm font-medium">
                {loadingAction === "billing"
                  ? "Loading Billing"
                  : loadingAction === "settings"
                  ? "Loading Settings"
                  : "Returning Home"}
              </AlertTitle>
              <AlertDescription className="text-xs">
                {loadingAction === "billing"
                  ? "Preparing your billing information..."
                  : loadingAction === "settings"
                  ? "Preparing your settings page..."
                  : "Taking you back to the home page..."}
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default SideNav;
