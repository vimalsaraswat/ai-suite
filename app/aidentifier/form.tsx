import React from "react";
import SubmitButton from "@/components/submit-button";
import Dropzone from "react-dropzone";

export default function Form({
  setFile,
  action,
}: {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  action: () => {};
}) {
  return (
    <form action={action}>
      <Dropzone
        accept={{
          "image/*": [".jpg", ".jpeg", ".png"],
        }}
        onDropAccepted={(acceptedFiles) => {
          setFile(acceptedFiles[acceptedFiles.length - 1]);
        }}
        multiple={false}
        maxSize={1024 * 1024}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({
              className:
                "p-3 mb-4 flex flex-col items-center justify-center w-full rounded-md cursor-pointer border-2 border-dotted border-input",
            })}
          >
            <div className="mb-2 mt-2 flex items-center gap-x-3">
              <label
                htmlFor="image"
                className="cursor-pointer text-sm text-[7E8DA0] focus:underline focus:outline-none"
              >
                Drop your image here
                <input {...getInputProps()} />
              </label>
            </div>
          </div>
        )}
      </Dropzone>

      <SubmitButton text="Go" className="w-full" />
    </form>
  );
}
