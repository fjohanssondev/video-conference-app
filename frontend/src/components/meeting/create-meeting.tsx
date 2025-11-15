import { z } from "zod";
import { formOptions, useForm } from "@tanstack/react-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

const formSchema = z
  .object({
    name: z.string().min(5),
    public: z.boolean(),
    scheduledStartAt: z.date(),
    scheduledEndAt: z.date(),
    description: z.string().min(5),
  })
  .refine((data) => data.scheduledEndAt > data.scheduledStartAt, {
    error: "End date must be after the start date",
    path: ["scheduledEndAt"],
  });

function CreateMeeting() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      scheduledStartAt: new Date(),
      scheduledEndAt: new Date(),
      public: false,
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    ...formOptions,
    onSubmit: async ({ value }) => {
      console.log(value);
      /* navigate({
        to: "/meeting/$meetingId",
        params: { meetingId: value.name },
      }); */
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Create Meeting</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>Create Meeting</DialogTitle>
          <DialogDescription>Create a new meeting</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Create meeting</FieldLegend>
              <FieldDescription>Enjoy your meeting</FieldDescription>
              <FieldGroup>
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Meeting name
                        </FieldLabel>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Sprint Planning"
                          required
                        />
                        <FieldDescription>
                          Give a name to the meeting
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <div className="flex gap-4">
                  <form.Field
                    name="scheduledStartAt"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel className="sr-only" htmlFor={field.name}>
                            When is the meeting scheduled to start?
                          </FieldLabel>
                          <DatePicker
                            name={field.name}
                            dateLabel="Start Date"
                            value={field.state.value}
                            onChange={(date) => {
                              if (date) {
                                field.handleChange(date);
                                form.validateField("scheduledEndAt", "change");
                              }
                            }}
                            defaultTime={{ hours: 10, minutes: 30, seconds: 0 }}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="scheduledEndAt"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field>
                          <FieldLabel className="sr-only" htmlFor={field.name}>
                            When is the meeting scheduled to end?
                          </FieldLabel>
                          <DatePicker
                            name={field.name}
                            dateLabel="End Date"
                            value={field.state.value}
                            onChange={(date) => {
                              if (date) {
                                field.handleChange(date);
                                form.validateField(
                                  "scheduledStartAt",
                                  "change"
                                );
                              }
                            }}
                            defaultTime={{ hours: 10, minutes: 30, seconds: 0 }}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </div>
                <form.Field
                  name="public"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Will the meeting be private or public?
                        </FieldLabel>
                        <Select
                          value={String(field.state.value)}
                          onValueChange={(value) =>
                            field.handleChange(value === "true")
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select public or private" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="false">Private</SelectItem>
                              <SelectItem value="true">Public</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="description"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Meeting description
                        </FieldLabel>
                        <Textarea
                          id={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="This is a meeting for the sprint planning..."
                          required
                        />
                        <FieldDescription>
                          Describe what the meeting is about
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">Create</Button>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { CreateMeeting };
