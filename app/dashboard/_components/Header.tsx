"use client";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { User } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";

function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    // Fetch user credits when component mounts and user is available
    const fetchCredits = async () => {
      if (user?.emailAddresses[0]?.emailAddress) {
        const userCredits = await db
          .select({ credits: User.credits })
          .from(User)
          .where(eq(User.email, user.emailAddresses[0].emailAddress))
          .execute();

        if (userCredits.length > 0) {
          setCredits(userCredits[0].credits);
        }
      }
    };

    if (isLoaded && isSignedIn) {
      fetchCredits();
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="p-5 shadow-sm border-b-2 bg-white">
      <div className="flex justify-between items-center">
        {/* Left side content (if any) */}
        <div></div>

        {/* Right side content */}
        <div className="flex flex-grid items-center gap-10">
          <div className="text-lg text-gray-500 font-mono mr-5">
            Credits: {credits !== null ? credits : "Loading..."}✨
          </div>
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
