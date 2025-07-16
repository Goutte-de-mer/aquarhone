"use server";
import { setCookieFromResponse } from "@/utils/cookies";

export async function registerUser(formData) {
  try {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    // Validation basique
    if (!firstName || !lastName || !email || !password) {
      return {
        success: false,
        message: "Tous les champs sont requis",
      };
    }

    const response = await fetch(`${process.env.API_URL}/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      await setCookieFromResponse(response);

      return {
        success: true,
        user: data.user,
      };
    }

    return {
      success: false,
      message: data.message || "Erreur lors de l'inscription",
    };
  } catch (error) {
    console.log("Erreur lors de l\'inscription :", error);
    return {
      success: false,
      message: "Erreur de connexion au serveur",
    };
  }
}
