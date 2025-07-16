import { cookies } from "next/headers";

export async function setCookieFromResponse(response) {
  const cookieStore = await cookies();
  const setCookieHeader = response.headers.get("set-cookie");

  if (setCookieHeader) {
    const [cookieValue] = setCookieHeader.split(";");
    const [name, value] = cookieValue.split("=");
    cookieStore.set(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });
  }
}
