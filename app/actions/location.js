"use server";

export async function fetchLocationFromPincode(pincode) {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Server Action Fetch Error:", error);
    return null; // Return null gracefully if it fails
  }
}