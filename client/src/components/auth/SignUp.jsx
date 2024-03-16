import { useState } from "react";
import { toast } from "react-toastify";
import unsignedApi from "../../utils/unsignedApi";

function SignUpView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    unsignedApi
      .post("signup", {
        user: { email, password, password_confirmation: passwordConfirmation },
      })
      .then(({ headers }) => {
        localStorage.setItem("authToken", headers.authorization);
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error("Error signing up: " + err.response.data.message[0]);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button disabled={password === "" || password !== passwordConfirmation}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpView;
