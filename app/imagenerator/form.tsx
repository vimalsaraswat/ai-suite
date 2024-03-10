import SubmitButton from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea";

export default function Form({
  action,
}: {
  action: (formData: FormData) => {};
}) {
  return (
    <form action={action}>
      <Textarea
        rows={3}
        cols={40}
        className="w-sm"
        name="prompt"
        placeholder="Write prompt to generate image... "
      />
      <SubmitButton text="Go" className="mt-4 w-full" />
    </form>
  );
}
