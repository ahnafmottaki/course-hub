import { Link } from "react-router";
import FileInput from "../../shared/FormElements/FileInput";
import Input from "../../shared/FormElements/Input";
import { useState } from "react";
import useTrimmedFrom from "../../hooks/useTrimmedForm";
import axios from "axios";
import Loader from "../../shared/UiElements/Loader";
import { toast } from "react-toastify";

const Register = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useTrimmedFrom({
    mode: "onChange",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onFormSubmit = async (data) => {
    if (!profilePicture) {
      return;
    }
    const formData = new FormData();
    formData.append("image", profilePicture);
    Object.entries(data).forEach(([name, value]) => {
      formData.append(name, value);
    });
    try {
      setSubmitting(true);
      await axios.post("http://localhost:3000/api/auth/register", formData);
      toast.success("Register successful!");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Something unexpected happened!"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
      {submitting && <Loader />}
    </>
  );
};

export default Register;
