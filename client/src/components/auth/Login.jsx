import { useState } from "react";
import unsignedApi from "../../utils/unsignedApi";
import { toast } from "react-toastify";
import { TextBox } from "@progress/kendo-react-inputs";
import visibilityIcon from "../../assets/icons/visibility.svg";
import visibilityOffIcon from "../../assets/icons/visibility_off.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <section className="is-flex is-align-items-center is-justify-content-center hero is-halfheight">
      <div className="box is-v-centered is-flex is-flex-direction-column is-align-items-center has-background-light">
        <h1 className="is-size-4 has-text-weight-semibold has-text-black-ter">
          Sign in
        </h1>
        <form
          onSubmit={handleSubmit}
          className="is-flex is-flex-direction-column mt-4"
        >
          <label className="has-text-black-ter ml-1" htmlFor="email">
            Email:
          </label>
          <TextBox
            type="email"
            name="email"
            placeholder="john@doe.com"
            size={"large"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="has-text-black-ter mt-2 ml-1" htmlFor="password">
            Password:
          </label>
          <TextBox
            type={showPassword ? "text" : "password"}
            name="password"
            size={"large"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 is-flex is-align-items-center"
            suffix={() => (
              <figure className="image is-16x16 mr-2">
                <img
                  src={showPassword ? visibilityIcon : visibilityOffIcon}
                  alt="visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="is-clickable"
                />
              </figure>
            )}
          />
          <button className="button mt-2">Login</button>
        </form>
        <span className="my-2 has-text-black-ter has-text-weight-semibold">
          or
        </span>
        <a href="/signup" className="button ">
          Sign up
        </a>
      </div>
    </section>
  );
}

export default Login;
