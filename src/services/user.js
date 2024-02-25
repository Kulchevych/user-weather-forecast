export async function getUser() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
