"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import React from "react";

function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="p-5 shadow-sm border-b-2 bg-white">
      <div className="flex justify-between items-center">
        {/* Left side content (if any) */}
        <div></div>

        {/* Right side content */}
        <div className="flex flex-grid items-center gap-5">
          <h2 className="text-xl font-mono">Hello {user.firstName}👋🏻</h2>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "48px",
                  height: "48px",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
