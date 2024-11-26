import { db } from "@/utils/db";
import { User } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  const { user } = await req.json();

  //checking if user exists
  try {
    const userInfo = await db
      .select()
      .from(User)
      .where(eq(User.email, user?.primaryEmailAddress.emailAddress));
    console.log("User info", userInfo);
    if (userInfo?.length === 0) {
      const SaveResult = await db
        .insert(User)
        .values({
          email: user?.primaryEmailAddress.emailAddress,
          name: user?.firstName + " " + user?.lastName,
          credits: 100,
        })
        .returning({ id: User.id });
      // console.log("Save result", SaveResult);

      return NextResponse.json({ result: SaveResult[0]});
    }
    return NextResponse.json({ result: userInfo[0] });
  } catch (error) {
    return NextResponse.json({ result: null });
  }

  //if not, create user and add to database
}
