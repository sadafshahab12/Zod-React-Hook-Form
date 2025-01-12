import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";
export type FormData = {
  email: string;
  githubUrl: string;
  yearsOfExperience: number;
  password: string;
  confirmPassword: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "email"
  | "githubUrl"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword";

export const userSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    githubUrl: z
      .string()
      .url()
      .includes("github.com", { message: "Invalid Github url" }),
    yearsOfExperience: z
      .number({
        required_error: "required field",
        invalid_type_error: "Years of Experience is required",
      })
      .min(1)
      .max(10),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(12, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
