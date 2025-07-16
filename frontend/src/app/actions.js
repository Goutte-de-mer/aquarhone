"use server";

import { cookies } from "next/headers";

export async function registerToActivity(activityId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { success: false, error: "Utilisateur pas identifié" };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/users/activities/${activityId}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      },
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    }

    return {
      success: false,
      error: data.message || "Erreur lors de l'inscription",
    };
  } catch (error) {
    return { success: false, error: "Erreur de connexion" };
  }
}
