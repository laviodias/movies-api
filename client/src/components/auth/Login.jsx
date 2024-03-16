import { useState } from "react";
import unsignedApi from "../../utils/unsignedApi";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    unsignedApi
      .post("/login", { user: { email, password } })
      .then(({ headers }) => {
        localStorage.setItem("authToken", headers.authorization);
        window.location.href = "/";
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };
  return (
    <div>
      <h1>Login</h1>
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
        <button>Login</button>
      </form>

      <a href="/signup">Sign up</a>
    </div>
  );
}

export default Login;
