import { NavLink } from "react-router";
import styled from "styled-components";
import Input from "../../shared/FormElements/Input";

const Register = () => {
  return (
    <div className="grow flex flex-col">
      <form className="flex flex-col gap-5 w-full min-w-xs max-w-lg m-auto">
        <h3 className="heading text-center ">Sign Up to Course Hub</h3>
        <Input
          type="text"
          label={"Full Name"}
          id={"fullName"}
          placeholder="Your full name"
        />

        <Input
          type="email"
          label={"Email"}
          id={"email"}
          placeholder="example@gamil.com"
        />

        <Input
          type="password"
          label={"Password"}
          id={"password"}
          placeholder="******"
        />
        <span className="hint">
          Don't have an account?{" "}
          <NavLink to={"/auth/login"} className="link hover:text-green-700">
            Login
          </NavLink>
        </span>

        <div className="primary-btn">Sign Up</div>
      </form>
    </div>
  );
};

const StyledWrapper = styled.div`
  .form-container .form .button-container .reset-button-container {
    filter: ;
  }
`;

export default Register;
