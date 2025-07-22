import { NavLink } from "react-router";
import styled from "styled-components";
import Input from "../../shared/FormElements/Input";

const Register = () => {
  return (
    <section className="min-h-screen max-w-7xl mx-auto my-10 ">
      <div>
        <NavLink to={"/"} className={"link"}>
          Go Home
        </NavLink>
      </div>

      <StyledWrapper className="flex justify-center">
        <div className="form-container">
          <div className="form">
            <span className="heading">Campus Ambassador Program</span>
            <Input />
            <span className="c1">Email</span>
            <input
              className="input"
              type="text"
              placeholder="example@gmail.com"
            />
            <span className="c1">Password</span>
            <input className="input" type="text" placeholder="*****" />
            <span className="hint">
              Don't have an account?{" "}
              <NavLink to={"/auth/login"} className="link hover:text-green-700">
                Login
              </NavLink>
            </span>
            <div className="button-container">
              <div className="send-button cursor-pointer">
                Become an Ambassador
              </div>
              <div className="reset-button-container">
                <div className="reset-button cursor-pointer" id="reset-btn">
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </section>
  );
};

const StyledWrapper = styled.div`
  .orange {
    color: #caf438;
  }

  .form-container .form .input {
  }

  .form-container .form .input:focus {
  }

  .form-container .form .textarea {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    background-color: #013747;
    color: #caf438;
    font-weight: bold;
    resize: none;
    max-height: 150px;
    margin-bottom: 20px;
    border-left: 1px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  .form-container .form .textarea:focus {
    border-left: 5px solid #caf438;
  }

  .form-container .form .button-container {
    display: flex;
    gap: 10px;
  }

  .form-container .form .button-container .send-button {
    flex-basis: 70%;
    background: #caf438;
    padding: 10px;
    color: #001925;
    text-align: center;
    font-weight: bold;
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  .form-container .form .button-container .send-button:hover {
    background: transparent;
    border: 1px solid #ff7a01;
    color: #caf438;
  }

  .form-container .form .button-container .reset-button-container {
    filter: drop-shadow(1px 1px 0px #ff7a01);
    flex-basis: 30%;
  }

  .form-container
    .form
    .button-container
    .reset-button-container
    .reset-button {
    position: relative;
    text-align: center;
    padding: 10px;
    color: #caf438;
    font-weight: bold;
    background: #001925;
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      0 100%
    );
    transition: all 0.2s ease-in-out;
  }

  .form-container
    .form
    .button-container
    .reset-button-container
    .reset-button:hover {
    background: #caf438;
    color: #001925;
  }
`;

export default Register;
