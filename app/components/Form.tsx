import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { FormData, userSchema, ValidFieldNames } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/form", data);
      const { errors = {} } = response.data;
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        email: "email",
        githubUrl: "githubUrl",
        yearsOfExperience: "yearsOfExperience",
        password: "password",
        confirmPassword: "confirmPassword",
      };
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );

      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }
      alert("Form Submitted Successfully");
    } catch (error) {
      alert("Submitting form Failed");
    }
    // console.log(
    //   `Success  ${email}\n${githubUrl}\n${yearsOfExperience}\n${password}\n${confirmPassword}`
    // );
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-teal-100 p-5 rounded-lg bg-bg-image bg-cover bg-no-repeat  "
      >
        <div className="grid col-auto gap-2">
          <h1 className="sm:text-3xl text-xl font-bold pb-4 text-center">
            Zod & React Hook Form
          </h1>
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <FormField
            type="text"
            placeholder="GitHub URL"
            name="githubUrl"
            register={register}
            error={errors.githubUrl}
          />
          <FormField
            type="number"
            placeholder="Years of Experience (1 - 10)"
            name="yearsOfExperience"
            register={register}
            error={errors.yearsOfExperience}
            valueAsNumber
          />
          <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />
          <FormField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            className="bg-teal-800 text-white py-3 rounded-md"
          >
            Submit{" "}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
