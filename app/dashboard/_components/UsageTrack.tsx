"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

// interface HISTORY{
//     id:number,
//     formData: string,
//     aiResponse: string,
//     templateSlug: string,
//     createdBy: string,
//     createdAt: string,

// }

function UsageTrack() {
  //   const {user} = useUser();

  //   useEffect(()=>{
  //     user && GetData();
  //   },[user]);

  //   const GetData = async() =>{
  //     {/*@ts-ignore*/}
  //     const result:HISTORY[] = await db
  //     .select()
  //     .from(AIOutput)
  //     .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

  //     GetTotalUsage(result);
  //   }

  //   const GetTotalUsage = (result:HISTORY[]) => {
  //     let total: number = 0;
  //     result.forEach((element) => {
  //       total = total + Number(element.aiResponse?.length);
  //     });
  //     console.log(total);
  //   };

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: "35%" }}
          ></div>
        </div>
        <h2 className="text-sm my-2">350/10,000 credits used</h2>
      </div>
      <Button variant={"secondary"} className="w-full text-primary my-3">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
