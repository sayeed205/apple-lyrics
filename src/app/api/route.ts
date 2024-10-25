import {
  getToken,
  getTTML,
  isValidAppleMusicUrl,
  parseAppleMusicURL,
} from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get("url");
  const idParam = request.nextUrl.searchParams.get("id");

  let id = "";
  let store = "in"; // Default to 'us' if store is not provided

  if (!urlParam && !idParam) {
    return NextResponse.json(
      {
        success: false,
        message: 'No "id" or "url" provided',
        status: 400,
        data: null,
      },
      { status: 400 },
    );
  }

  if (urlParam) {
    // Validate and parse Apple Music URL
    if (isValidAppleMusicUrl(urlParam)) {
      const meta = parseAppleMusicURL(urlParam);
      if (meta) {
        id = meta.id;
        store = meta.store;
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid Apple Music URL",
            status: 400,
            data: null,
          },
          { status: 400 },
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid URL format",
          status: 400,
          data: null,
        },
        { status: 400 },
      );
    }
  } else if (idParam) {
    // Validate id parameter
    try {
      id = parseInt(idParam).toString();
    } catch (error) {
      console.error("Failed to parse Apple Music id: ", error);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Apple Music id",
          status: 400,
          data: null,
        },
        { status: 400 },
      );
    }
  } else {
    // No id or url parameter provided
    return NextResponse.json(
      {
        success: false,
        message: "No id or url provided",
        status: 400,
        data: null,
      },
      { status: 400 },
    );
  }

  // Fetching lyrics
  try {
    const token = await getToken();
    const ttml = await getTTML(id, token, store);
    return NextResponse.json(
      {
        success: true,
        message: ttml ? "Lyrics Found" : "Lyrics not found",
        status: ttml ? 200 : 404,
        data: ttml,
      },
      { status: ttml ? 200 : 404 },
    );
  } catch (err) {
    console.error("Failed to get Lyrics: ", err);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching lyrics",
        status: 400,
        data: null,
      },
      { status: 400 },
    );
  }
}
