import { NavLink } from "react-router";
import Input from "../../shared/FormElements/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../shared/UiElements/Loader";

const validatePassword = (value) => {
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(value))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(value))
    return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(value)) return "Password must contain at least one number";
  if (!/[^A-Za-z0-9]/.test(value))
    return "Password must contain at least one symbol";
  return true;
};

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm({ mode: "onChange" });

  const selectedFile = watch("profilePic");
  useEffect(() => {
    const file = selectedFile?.[0];
    if (
      !file ||
      !["image/png", "image/jpg", "image/jpeg"].includes(file.type)
    ) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [setPreviewUrl, selectedFile]);

  const onSignUp = async (data) => {
    setSubmitting(true);
    const formData = new FormData();
    for (const key in data) {
      const element = data[key];
      if (key === "profilePic") {
        formData.append(key, element[0]);
        continue;
      }
      formData.append(key, element);
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
    } catch (err) {
      if (err.response) {
        setError(error.response?.message || "Something Unexpected Happened");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitting && <Loader />}
      <div className="grow flex  flex-col">
        <form
          onSubmit={handleSubmit(onSignUp)}
          className="flex  flex-col gap-5 w-full min-w-xs max-w-lg m-auto"
        >
          <h3 className="heading text-center ">Sign Up to Course Hub</h3>
          <Input
            errorMsg={errors?.name?.message}
            type="text"
            label={"Full Name"}
            id={"fullName"}
            placeholder="Your full name"
            {...register("name", {
              required: "Full name is required",
              minLength: { value: 6, message: "at least 6 characters " },
              maxLength: { value: 18, message: "maximum 18 characters" },
            })}
          />

          <Input
            type="email"
            label={"Email"}
            id={"email"}
            errorMsg={errors?.email?.message}
            placeholder="example@gamil.com"
            {...register("email", {
              required: "please enter a valid email",
              pattern: {
                value: /^[a-zA-Z][a-zA-Z0-9._]*@gmail.com$/,
                message: "pleases enter a valid email",
              },
            })}
          />
          <Input
            type="file"
            label={"Profile Picture"}
            id={"profile-pic"}
            errorMsg={errors.profilePic?.message}
            {...register("profilePic", {
              required: "Profile picture is required",
              validate: {
                acceptedFormats: (files) =>
                  ["image/jpg", "image/jpeg", "image/png"].includes(
                    files[0]?.type
                  ) || "Only JPG/PNG files are allowed",
              },
            })}
          />

          {previewUrl && (
            <div>
              <img
                src={previewUrl}
                alt="preview"
                className="w-32 h-32  rounded object-cover border"
              />
            </div>
          )}

          <Input
            defaultValue="Ah201408naf@"
            type="password"
            label={"Password"}
            id={"password"}
            placeholder="******"
            errorMsg={errors?.password?.message}
            {...register("password", {
              required: "Password is required",
              validate: validatePassword,
            })}
          />
          <span className="hint">
            Don't have an account?{" "}
            <NavLink to={"/auth/login"} className="link hover:text-green-700">
              Login
            </NavLink>
          </span>

          <button disabled={submitting} type="submit" className="primary-btn">
            {submitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
