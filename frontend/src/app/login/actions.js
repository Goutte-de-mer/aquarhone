"use server";

export async function loginUser(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // Validation basique
    if (!email || !password) {
      return {
        success: false,
        message: "Tous les champs sont requis",
      };
    }

    const response = await fetch(`${process.env.API_URL}/users/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Erreur lors de la connexion",
      };
    }
    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.log("Erreur lors de la connexion : ", error);
    return {
      success: false,
      message: "Erreur de connexion au serveur",
    };
  }
}
