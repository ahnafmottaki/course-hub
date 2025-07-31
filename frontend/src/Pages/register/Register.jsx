import { Link, useNavigate } from "react-router";
import FileInput from "../../shared/FormElements/FileInput";
import Input from "../../shared/FormElements/Input";
import { useState } from "react";
import useTrimmedFrom from "../../hooks/useTrimmedForm";
import Loader from "../../shared/UiElements/Loader";
import { toast } from "react-toastify";
import { showSuccessOrError } from "../../utils/sweetAlert2";
import { setUser } from "../../store/slices/auth-slice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import LoginAndRegister from "../../shared/Components/loginAndRegister";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const response = await axiosInstance.post("/auth/register", formData);
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (err) {
      showSuccessOrError({
        type: "error",
        title: "Oops..",
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <LoginAndRegister label={"Signin To CourseHub"}>
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
          <button
            disabled={submitting}
            type="submit"
            className={`primary-button w-full ${
              submitting ? "opacity-30" : ""
            }`}
          >
            {submitting ? "signing up..." : "Signup"}
          </button>
        </form>
      </LoginAndRegister>

      {submitting && <Loader />}
    </>
  );
};

export default Register;
