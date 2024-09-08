import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { userResume } from "./schema";

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL!);
export const db = drizzle(sql, { schema });

export async function saveResumeSection(
  email: string | undefined,
  data: any,
  section: string
) {
  if (!email) throw new Error("User email is required");

  const existingUser = await db
    .select()
    .from(userResume)
    .where(eq(userResume.createdBy, email));

  const sectionData = mapSectionDataToSchema(data, section);

  if (existingUser.length > 0) {
    await db
      .update(userResume)
      .set(sectionData)
      .where(eq(userResume.createdBy, email));
  } else {
    await db.insert(userResume).values({
      ...sectionData,
      createdBy: email,
      createdAt: new Date().toISOString(),
      uniqueId: generateUniqueId(),
    });
  }
}

function mapSectionDataToSchema(data: any, section: string) {
  switch (section) {
    case "PersonalInfo":
      return {
        firstName: data.firstName,
        lastName: data.lastName,
        designation: data.jobTitle,
        address: data.address,
        email: data.email,
        phone: data.phone,
        summary: data.summary,
      };
    case "Experience":
      return {
        designation1: data.experience?.[0]?.title,
        companyName1: data.experience?.[0]?.company,
        city1: data.experience?.[0]?.city,
        state1: data.experience?.[0]?.state,
        startDate1: data.experience?.[0]?.startDate,
        endDate1: data.experience?.[0]?.endDate,
        description1: data.experience?.[0]?.workSummary,

        designation2: data.experience?.[1]?.title,
        companyName2: data.experience?.[1]?.company,
        city2: data.experience?.[1]?.city,
        state2: data.experience?.[1]?.state,
        startDate2: data.experience?.[1]?.startDate,
        endDate2: data.experience?.[1]?.endDate,
        description2: data.experience?.[1]?.workSummary,

        designation3: data.experience?.[2]?.title,
        companyName3: data.experience?.[2]?.company,
        city3: data.experience?.[2]?.city,
        state3: data.experience?.[2]?.state,
        startDate3: data.experience?.[2]?.startDate,
        endDate3: data.experience?.[2]?.endDate,
        description3: data.experience?.[2]?.workSummary,

        designation4: data.experience?.[3]?.title,
        companyName4: data.experience?.[3]?.company,
        city4: data.experience?.[3]?.city,
        state4: data.experience?.[3]?.state,
        startDate4: data.experience?.[3]?.startDate,
        endDate4: data.experience?.[3]?.endDate,
        description4: data.experience?.[3]?.workSummary,
      };
    case "Education":
      return {
        schoolName1: data.education?.[0]?.universityName,
        degree1: data.education?.[0]?.degree,
        startDateEdu1: data.education?.[0]?.startDate,
        endDateEdu1: data.education?.[0]?.endDate,
        descriptionEdu1: data.education?.[0]?.description,
        // Repeat for education 2, 3, and 4
        schoolName2: data.education?.[1]?.universityName,
        degree2: data.education?.[1]?.degree,
        startDateEdu2: data.education?.[1]?.startDate,
        endDateEdu2: data.education?.[1]?.endDate,
        descriptionEdu2: data.education?.[1]?.description,
        // ... (education 3 and 4)
        schoolName3: data.education?.[2]?.universityName,
        degree3: data.education?.[2]?.degree,
        startDateEdu3: data.education?.[2]?.startDate,
        endDateEdu3: data.education?.[2]?.endDate,
        descriptionEdu3: data.education?.[2]?.description,

        schoolName4: data.education?.[3]?.universityName,
        degree4: data.education?.[3]?.degree,
        startDateEdu4: data.education?.[3]?.startDate,
        endDateEdu4: data.education?.[3]?.endDate,
      };
    case "Projects":
      return {
        projectName1: data.projects?.[0]?.title,
        projectDescription1: data.projects?.[0]?.description,
        // Repeat for projects 2, 3, and 4
        projectName2: data.projects?.[1]?.title,
        projectDescription2: data.projects?.[1]?.description,
        // ... (projects 3 and 4)
        projectName3: data.projects?.[2]?.title,
        projectDescription3: data.projects?.[2]?.description,

        projectName4: data.projects?.[3]?.title,
        projectDescription4: data.projects?.[3]?.description,
      };
    default:
      return {};
  }
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function getUserResumeData(email: string) {
  const userData = await db
    .select()
    .from(userResume)
    .where(eq(userResume.createdBy, email));

  if (userData.length === 0) return null;

  const user = userData[0];

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    jobTitle: user.designation,
    address: user.address,
    email: user.email,
    phone: user.phone,
    summary: user.summary,
    experience: [
      {
        title: user.designation1,
        company: user.companyName1,
        city: user.city1,
        state: user.state1,
        startDate: user.startDate1,
        endDate: user.endDate1,
        workSummary: user.description1,
      },
      {
        title: user.designation1,
        company: user.companyName1,
        city: user.city1,
        state: user.state1,
        startDate: user.startDate1,
        endDate: user.endDate1,
        workSummary: user.description1,
      },
      {
        title: user.designation1,
        company: user.companyName1,
        city: user.city1,
        state: user.state1,
        startDate: user.startDate1,
        endDate: user.endDate1,
        workSummary: user.description1,
      },
      {
        title: user.designation1,
        company: user.companyName1,
        city: user.city1,
        state: user.state1,
        startDate: user.startDate1,
        endDate: user.endDate1,
        workSummary: user.description1,
      },
      // ... repeat for experience 2, 3, and 4
    ],
    education: [
      {
        universityName: user.schoolName1,
        degree: user.degree1,
        startDate: user.startDateEdu1,
        endDate: user.endDateEdu1,
        description: user.descriptionEdu1,
      },
      {
        universityName: user.schoolName1,
        degree: user.degree1,
        startDate: user.startDateEdu1,
        endDate: user.endDateEdu1,
        description: user.descriptionEdu1,
      },
      {
        universityName: user.schoolName1,
        degree: user.degree1,
        startDate: user.startDateEdu1,
        endDate: user.endDateEdu1,
        description: user.descriptionEdu1,
      },
      {
        universityName: user.schoolName1,
        degree: user.degree1,
        startDate: user.startDateEdu1,
        endDate: user.endDateEdu1,
        description: user.descriptionEdu1,
      },
    ],
    projects: [
      {
        title: user.projectName1,
        description: user.projectDescription1,
      },
      {
        title: user.projectName1,
        description: user.projectDescription1,
      },
      {
        title: user.projectName1,
        description: user.projectDescription1,
      },
      {
        title: user.projectName1,
        description: user.projectDescription1,
      },
    ],
  };
}
