"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { Identify } from "./action";
import Form from "./form";

interface IdentifiedObject {
  label: string;
  mask: string;
  score: number;
}

export default function Page() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [apiResponse, setApiResponse] = useState<IdentifiedObject[]>([]);
  const [toShow, setToShow] = useState<IdentifiedObject | undefined>(undefined);
  const imagePreview = file ? URL.createObjectURL(file) : undefined;

  const identifyThings = async () => {
    // Make sure we have a file to work with
    if (!file) return;

    // Prepare data to send to our backend
    const formData = new FormData();
    formData.set("theImage", file);

    try {
      // Call our backend API - which further calls Hugging Face
      const response = await Identify(formData);

      // If the API call was successful, set the response
      if (response) {
        console.log("File uploaded successfully");
        setApiResponse(response.body);
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
    }
  };

  function toggleThis(label: string) {
    const showThis = apiResponse.find((obj) => obj.label === label);
    setToShow((prev: IdentifiedObject | undefined) => {
      if (prev === showThis) {
        return undefined;
      }
      return showThis || undefined;
    });
  }

  return (
    <>
      <h1 className="my-4 text-5xl">AI-dentifier</h1>

      <Form setFile={setFile} action={identifyThings} />

      <section className="placeholderdiv relative h-80 w-80">
        {/* Preview the image */}
        {imagePreview && (
          <Image
            alt="preview image"
            src={imagePreview}
            width={400}
            height={400}
            className="absolute z-0 rounded-sm object-contain"
          />
        )}

        {/* Show the masked image if an identified object is selected */}
        {toShow && (
          <Image
            alt="masked-image of object"
            src={`data:image/png;base64,${toShow.mask}`}
            width={400}
            height={400}
            className="absolute z-20 rounded-sm object-contain mix-blend-screen invert"
          />
        )}
      </section>

      {/* Display a list of all identified objects */}
      {apiResponse.length > 0 && (
        <div className="mt-12 ">
          <div className="mb-4">Identified objects: </div>
          <div className="flex">
            {apiResponse.map((e) => (
              <div className="mx-2" key={e.label}>
                <Button
                  variant="outline"
                  // className="px-4 py-1 bg-blue-600 rounded-md"
                  onClick={() => toggleThis(e.label)}
                >
                  {e.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mb-4 text-muted-foreground">
        This is a project that uses Facebooks DEtection TRansformer (DETR) model
        trained end-to-end on COCO 2017 panoptic (118k annotated images).
      </div>
    </>
  );
}
