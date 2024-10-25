import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_URL = "https://beta.music.apple.com";

export const getToken = async (): Promise<string> => {
  try {
    const response = await fetch(BASE_URL);
    const body = await response.text();

    const regex = /\/assets\/index-legacy-[^/]+\.js/;
    const indexJsUri = body.match(regex)?.[0];

    if (!indexJsUri) {
      throw new Error("Index JS URI not found");
    }

    const indexResponse = await fetch(BASE_URL + indexJsUri);
    const indexBody = await indexResponse.text();

    const tokenRegex = /eyJh([^"]*)/;
    const token = indexBody.match(tokenRegex)?.[0];

    if (!token) {
      throw new Error("Token not found");
    }

    return token;
  } catch (error) {
    console.error("Failed to get token:", error);
    throw new Error(
      "Failed to get token and no valid authorization token found.",
    );
  }
};

export const getTTML = async (
  trackId: string,
  token: string,
  storefront = "in",
) => {
  const url = `https://amp-api.music.apple.com/v1/catalog/${storefront}/songs/${trackId}/syllable-lyrics`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Origin: "https://music.apple.com",
        Referer: "https://music.apple.com/",
        Authorization: `Bearer ${token}`,
        Cookie: `media-user-token=${process.env.MEDIA_USER_TOKEN}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data?.data?.[0]?.attributes?.ttml) {
      return data.data[0].attributes.ttml as string;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to get tTML for track:", error);
    return null;
  }
};

export const parseAppleMusicURL = (url: string) => {
  const pathMatch = url.match(
    /https:\/\/music\.apple\.com\/([a-z]{2,3})\/\w+\/[\w-]+\/(\d+)/,
  );
  const queryMatch = url.match(/[?&]i=(\d+)/);

  if (pathMatch) {
    return {
      store: pathMatch[1],
      id: queryMatch ? queryMatch[1] : pathMatch[2],
    };
  }
  return null;
};

export const isValidAppleMusicUrl = (url: string): boolean => {
  const pattern =
    /^https:\/\/music\.apple\.com\/([a-z]{2,3})\/(song|album)\/[^/]+\/(\d+)(\?.*i=\d+.*)?$/i;
  return pattern.test(url);
};
