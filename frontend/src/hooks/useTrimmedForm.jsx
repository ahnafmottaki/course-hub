import { useForm } from "react-hook-form";

const useTrimmedFrom = (options = {}) => {
  const form = useForm(options);

  const registerTrimmed = (name, registerOptions = {}) => {
    return form.register(name, {
      ...registerOptions,
      setValueAs: (val) => {
        return typeof val === "string" ? val.trim() : val;
      },
    });
  };

  return { ...form, register: registerTrimmed };
};

export default useTrimmedFrom;
