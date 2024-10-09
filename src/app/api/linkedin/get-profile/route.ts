import { NextRequest, NextResponse } from "next/server";

import { TLinkedInCookies } from "@utils/types";
import { LINKEDIN_HEADERS } from "@utils/constants";

export const POST = async (request: NextRequest) => {
  try {
    const body: TLinkedInCookies = await request.json();
    const response = await fetch("https://www.linkedin.com/voyager/api/me", {
      headers: {
        Cookie: `JSESSIONID=${body.JSESSIONID};li_at=${body.li_at}`,
        "Csrf-Token": body.JSESSIONID,
        ...LINKEDIN_HEADERS,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Profile Data: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json({ profileData: data, requestedBody: body });
  } catch (error: any) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { error: error?.message || "An unknown error occurred" },
      { status: 500 }
    );
  }
};
