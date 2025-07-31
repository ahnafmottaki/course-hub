import { useState } from "react";
import useTrimmedFrom from "../../hooks/useTrimmedForm";
import LoginAndRegister from "../../shared/Components/loginAndRegister";
import Input from "../../shared/FormElements/Input";
import { Link, useLocation, useNavigate } from "react-router";
import axiosInstance from "../../config/axiosInstance";
import { setUser } from "../../store/slices/auth-slice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { showSuccessOrError } from "../../utils/sweetAlert2";
import Loader from "../../shared/UiElements/Loader.jsx";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useTrimmedFrom({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const onFormSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await axiosInstance.post("/auth/login", data);
      if (response.data?.success) {
        dispatch(setUser(response.data.data));
        toast.success(response.data?.message);
        navigate(location.state?.from || "/");
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
      <LoginAndRegister label={"Login to CourseHub"}>
        <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
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
            Didn't have an account?{" "}
            <Link
              className="font-medium hover:text-indigo-700"
              to={"/register"}
            >
              Register
            </Link>
          </p>
          <button
            disabled={submitting}
            type="submit"
            className={`primary-button w-full ${
              submitting ? "opacity-30" : ""
            }`}
          >
            {submitting ? "logging in..." : "Login"}
          </button>
        </form>
      </LoginAndRegister>
      {submitting && <Loader />}
    </>
  );
};

export default Login;
