import { Link } from "react-router";
import FileInput from "../../shared/FormElements/FileInput";
import Input from "../../shared/FormElements/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    mode: "onChange",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const onFormSubmit = (data) => {
    if (!profilePicture) {
      return;
    }
    console.log(data);
  };

  return (
    <section className="section  min-h-[calc(100dvh-66px)]  flex justify-center items-center">
      <div className="max-w-md w-full min-w-xs">
        <h1 className="text-4xl font-bold text-indigo-600 text-center mb-5">
          Signin To CourseHub
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
          <Input
            label={"Name"}
            id={"name"}
            isValid={!errors.name}
            type="text"
            placeholder="Your full name"
            {...register("name", {
              required: true,
              minLength: 4,
              maxLength: 18,
            })}
          />
          <FileInput
            onSet={setProfilePicture}
            label={"Profile Picture"}
            id={"profile-picture"}
            accept="image/png, image/jpg, image/jpeg"
          />
          <Input
            label={"Email"}
            id={"email"}
            isValid={!errors.email}
            type="text"
            placeholder="example@gmail.com"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z][a-zA-Z0-9._-]*@gmail\.com$/i,
            })}
          />
          <Input
            label={"Password"}
            id={"password"}
            isValid={!errors.password}
            type="password"
            placeholder="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
          />
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="font-medium hover:text-indigo-700" to={"/login"}>
              Login
            </Link>
          </p>
          <button type="submit" className="primary-button w-full">
            Signup
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
