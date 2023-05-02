import React, { useState } from "react";
import Cookie from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [user, getUser] = useState({ email: "", password: "" });
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
        email: user.email,
        password: user.password,
      };
      //  const host = "https://inotebook-backend-0jvu.onrender.com/api/auth/login";
      const host = "http://localhost:5000/api/auth/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(host, options);
      console.log(response);

      if (response.ok === true) {
        const data = await response.json();
        Cookie.set("jwt_token", data.jwtToken, { expires: 9 });
        Cookie.set("name", data.name, { expires: 30 });
        navigate("/");
        window.location.reload();
      } else {
        const data = await response.json();
        setErr(data);
      }
    }
  };

  const onCheck = () => {
    setShowPass((prev) => !prev);
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
          Login
        </h1>

        <div className="form-floating mb-3">
          <input
            onChange={onChange}
            value={user.email}
            name="email"
            type="email"
            className="shadow-sm form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            onChange={onChange}
            value={user.password}
            name="password"
            type={showPass ? "text" : "password"}
            className="shadow-sm form-control"
            id="floatingPassword"
            placeholder="Password"
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
        Dont have an account?
        <Link style={{ textDecoration: "none" }} to="/api/auth/signup">
          <span className="text-primary fw-bold font-monospace"> Signup</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
