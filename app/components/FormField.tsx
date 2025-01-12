import { FormFieldProps } from "@/types";
import React from "react";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => {
  return (
    <>
      <input
        className="border border-slate-500 md:py-3 py-[0.3rem] px-4 rounded-md outline-none bg-transparent placeholder:text-slate-600 text-slate-900 backdrop-blur-lg backdrop-brightness-150 sm:placeholder:text-sm placeholder:text-[0.7rem]"
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && (
        <span className="text-white text-[0.7rem] px-4 rounded-lg bg-red-400 ">
          {error.message}{" "}
        </span>
      )}
    </>
  );
};

export default FormField;
