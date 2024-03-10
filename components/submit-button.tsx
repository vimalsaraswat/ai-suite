"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

function SubmitButton({
  text = "Submit",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={className}
      disabled={pending ? true : false}
      aria-disabled={pending}
    >
      {pending && <ReloadIcon className="animate-spin" />}
      {pending ? "Submitting..." : text}
    </Button>
  );
}

export default SubmitButton;
