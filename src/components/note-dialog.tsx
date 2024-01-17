import { CreateNote, createNoteSchema } from "@/types/notes-crud";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./ui/loading-button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";

type NoteDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  notetoEdit?: Note;
};

function NoteDialog({ open, setOpen, notetoEdit }: NoteDialogProps) {
  const form = useForm<CreateNote>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: notetoEdit?.title || "",
      content: notetoEdit?.content || "",
    },
  });

  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async (input: CreateNote) => {
    try {
      if (notetoEdit) {
        const response = await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({
            id: notetoEdit.id,
            ...input,
          }),
        });

        if (!response.ok) {
          throw Error(`Status code: ${response.status}`);
        }
      } else {
        const response = await fetch("/api/notes/", {
          method: "POST",
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          throw Error(`Status code: ${response.status}`);
        }

        form.reset();
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Oops! Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note title</FormLabel>
                    <FormControl>
                      <Input placeholder="Note title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Note content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <LoadingButton
                  type="submit"
                  loading={form.formState.isSubmitting}
                >
                  Submit
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NoteDialog;
