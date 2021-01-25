import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import axiosConfig from "../../axios/axiosConfig";
import endpoints from "../../const/endpoints";
import { UserContext } from "../../context/UserContext";
import { INVALID_USERNAME_PASSWORD } from "../../const";

const SignUpLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const postUserSignUp = async (body) => {
    try {
      const resp = await axiosConfig.post(endpoints.signUp, body);
      const { data } = resp;

      if (data) {
        setUserData(data);
        history.push("/dashboard");
      }
    } catch (error) {
      console.error(error.response.data.error);
      if (error.response.data.error) {
        setFormError(error.response.data.error);
      }
    }
  };

  const postUserSignIn = async (body) => {
    try {
      const resp = await axiosConfig.post(endpoints.signIn, body);
      const { data } = resp;

      if (data) {
        setUserData(data);
        history.push("/dashboard");
      }
    } catch (error) {
      console.error(error.response.data.error);
      if (error.response.data.error) {
        setFormError(error.response.data.error);
      }
    }
  };

  const isUserCredValid = (username, password) =>
    username.length >= 2 && password.length >= 2;

  const setFormErrorMessage = (errorMessage) => setFormError(errorMessage);

  const handleSignIn = (event) => {
    event.preventDefault();
    if (isUserCredValid) {
      return postUserSignIn({ username, password });
    }
    return setFormErrorMessage(INVALID_USERNAME_PASSWORD);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (isUserCredValid) {
      return postUserSignUp({ username, password });
    }
    return setFormErrorMessage(INVALID_USERNAME_PASSWORD);
  };

  return (
    <form>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      {formError && <span>{formError}</span>}
      <br />
      <br />
      <button type="submit" onClick={handleSignIn}>
        Login
      </button>
      <button type="submit" onClick={handleSignUp}>
        Signup
      </button>
    </form>
  );
};

export default SignUpLogin;
