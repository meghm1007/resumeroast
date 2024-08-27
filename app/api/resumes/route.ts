import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { Resumes } from "@/utils/schema";
import { clerkClient, auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uniqueId, content } = await request.json();
    const createdAt = new Date().toISOString();

    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 404 }
      );
    }

    await db.insert(Resumes).values({
      uniqueId,
      content,
      createdAt,
      createdBy: email,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uniqueId, roastScore } = await request.json();
    if (
      !uniqueId ||
      typeof roastScore !== "number" ||
      roastScore < 1 ||
      roastScore > 10
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;
    const resume = await db
      .select()
      .from(Resumes)
      .where(eq(Resumes.uniqueId, uniqueId))
      .limit(1);
    if (resume.length === 0) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const existingRoasts = Array.isArray(resume[0].roasts)
      ? resume[0].roasts
      : [];
    const updatedRoasts = [
      ...existingRoasts.filter((roast) => roast.userId !== userId),
      { userId, email, score: roastScore, date: new Date().toISOString() },
    ];

    await db
      .update(Resumes)
      .set({ roasts: updatedRoasts })
      .where(eq(Resumes.uniqueId, uniqueId));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error adding roast:", error);
    return NextResponse.json({ error: "Failed to add roast" }, { status: 500 });
  }
}
