import React, { useState } from "react";
import Cookie from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const Signup = (props) => {
  const [user, getUser] = useState({ name: "", email: "", password: "" });
  const [checkEmail, setCheckEmail] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    getUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      alert("Invalid Credentials!");
    } else {
      const userDetails = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
      // const host = "https://inotebook-backend-0jvu.onrender.com/api/auth/register";
      const host = "http://localhost:5000/api/auth/register";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(host, options);

      if (response.ok === true) {
        const data = await response.json();
        console.log(data);
        Cookie.set("jwt_token", data.jwtToken, { expires: 9 });
        Cookie.set("name", data.name, { expires: 10 });
        alert("Account Created Successfully");
        navigate("/");
      } else {
        const data = await response.json();
        setErr(data);
      }
    }
  };

  const onCheck = () => {
    setShowPass((prev) => !prev);
  };

  const onBlurEmail = (e) => {
    if (!e.target.value) {
      setCheckEmail("is-invalid");
    } else {
      setCheckEmail("");
    }
  };

  const onBlurPass = (e) => {
    if (!e.target.value) {
      setCheckPass("is-invalid");
    } else {
      setCheckPass("");
    }
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center">
      <form
        style={{
          minWidth: "200px",
        }}
        className="w-25 d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <h1 className="align-self-center mb-4">
          <span className="text-primary fw-normal font-monospace">
            iNotebook
          </span>{" "}
          Signup
        </h1>
        <div className="form-floating mb-3">
          <input
            value={user.name}
            onChange={onChange}
            name="name"
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Username"
          />
          <label htmlFor="floatingName">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            onBlur={onBlurEmail}
            onChange={onChange}
            value={user.email}
            name="email"
            type="email"
            className={`shadow-sm form-control ${checkEmail}`}
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            onBlur={onBlurPass}
            onChange={onChange}
            value={user.password}
            name="password"
            type={showPass ? "text" : "password"}
            className={`shadow-sm form-control ${checkPass}`}
            id="floatingPassword"
            placeholder="Password"
            minLength={5}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="mt-3 mb-3 form-check">
          <input
            onChange={onCheck}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Show Password
          </label>
        </div>
        <button type="submit" className="shadow mt-3 btn btn-primary">
          Submit
        </button>
        <p className="mt-1 text-danger fw-normal">{err}</p>
      </form>
      <p>
        Already have an account?
        <Link style={{ textDecoration: "none" }} to="/api/auth/login">
          <span className="text-primary fw-bold font-monospace"> Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Signup;
