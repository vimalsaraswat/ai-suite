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
          "image/*": [],
        }}
        onDropAccepted={(acceptedFiles) => {
          setFile(acceptedFiles[acceptedFiles.length - 1]);
        }}
        multiple={false}
        maxSize={1024 * 1024}
      >
        {({ getRootProps, getInputProps, acceptedFiles, fileRejections }) => (
          <div
            {...getRootProps({
              className:
                "p-3 mb-4 flex flex-col items-center justify-center w-full rounded-md border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50",
            })}
          >
            <div className="mb-2 mt-2 flex items-center gap-x-3 text-xs">
              <label
                htmlFor="image"
                className="cursor-pointer text-center font-medium focus:underline focus:outline-none"
              >
                Drop your image here
                {fileRejections[0]?.errors[0].code == "file-too-large" && (
                  <p className="text-destructive">File is larger than 1MB</p>
                )}
                {acceptedFiles.length > 0 && (
                  <p className="text-muted-foreground">
                    Uploaded file: {acceptedFiles[0].name.slice(0, 25)} (
                    {Math.round(acceptedFiles[0].size / 1024)} KB)
                  </p>
                )}
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
