import { useState } from "react";
import { toast } from "react-toastify";
import unsignedApi from "../../utils/unsignedApi";
import { TextBox } from "@progress/kendo-react-inputs";
import visibilityIcon from "../../assets/icons/visibility.svg";
import visibilityOffIcon from "../../assets/icons/visibility_off.svg";

function SignUpView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    unsignedApi
      .post("signup", {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
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
    <section className="is-flex is-align-items-center is-justify-content-center hero is-halfheight">
      <div className="box is-v-centered is-flex is-flex-direction-column is-align-items-center has-background-light">
        <h1 className="is-size-4 has-text-weight-semibold has-text-black-ter">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="is-flex is-flex-direction-column mt-4"
        >
          <label className="has-text-black-ter ml-1 mt-2" htmlFor="email">
            Name:
          </label>
          <TextBox
            type="text"
            placeholder="John doe"
            className="mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="has-text-black-ter ml-1" htmlFor="email">
            Email:
          </label>
          <TextBox
            type="email"
            placeholder="john@doe.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="has-text-black-ter ml-1 mt-2" htmlFor="email">
            Password:
          </label>
          <TextBox
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="is-flex is-align-items-center"
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

          <label className="has-text-black-ter ml-1" htmlFor="email">
            Confirm your password:
          </label>
          <TextBox
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button
            className="button mt-4"
            disabled={password === "" || password !== passwordConfirmation}
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignUpView;
