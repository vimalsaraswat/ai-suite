"use client";

import { useState } from "react";
import Image from "next/image";
import Form from "./form";
import { TextToImage } from "./action";

export default function Page() {
  const [apiResponse, setApiResponse] = useState("");

  const generateImage = async (formData: FormData) => {
    // Make sure we have a prompt to work with
    if (!formData.get("prompt")) return;

    try {
      const response = await TextToImage(formData);
      if (response) {
        console.log("Image generated successfully");

        // Set the image URL state variable
        setApiResponse(`data:image/png;base64,${response}`);
      } else {
        console.error("Failed to generate image");
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
    }
  };

  return (
    <>
      <h1 className=" mb-4 text-5xl">Imagenerator</h1>

      <Form action={generateImage} />

      <section className="relative h-80 w-80">
        {apiResponse && (
          <Image
            height={400}
            width={400}
            alt="generated image"
            src={apiResponse}
          />
        )}
      </section>

      <div className="mb-4 text-muted-foreground">
        This is a project that uses Stable Diffusion to generate images from
        text prompts
      </div>
    </>
  );
}
