"use server";

export async function TextToImage(formData: FormData) {
  // Extract `prompt` sent from the frontend
  const prompt = formData.get("prompt");

  // Call Hugging Face with our API Key
  const response = await fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    {
      headers: { Authorization: `Bearer ${process.env.HF_APIKEY}` },
      method: "POST",
      body: JSON.stringify(prompt),
    },
  );

  // Handle potential errors
  if (!response.ok) {
    throw new Error(
      `Hugging Face API call failed with status ${response.status}`,
    );
  }

  // Read the Blob as an array buffer
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Encode the buffer to Base64 string
  const base64String = buffer.toString("base64");

  // Return the Base64 string
  return base64String;
}
