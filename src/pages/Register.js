import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";

const Register = () => {
  const URL = useSelector(selectUrl)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [matchPassword, setMatchPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [duplicateName, setDuplicateName] = useState(false);

  const regexName = /^(?=.*).{3,15}$/;
  //const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-z]).{6,}$/;
  const regexPassword = /^(?=.*[a-zA-z]).{6,}$/;

  const RegisterUser = async (e) => {
    e.preventDefault();

    if (!regexName.test(name) || !regexPassword.test(password)) {
      return console.log(
        `regexs ${regexName.test(name)} ${regexPassword.test(password)}`
      );
    }

    if (password !== passwordConfirm)
      return (
        setMatchPassword(true),
        setTimeout(() => {
          setMatchPassword(false);
        }, 4000)
      );

    const result = await fetch(URL+"register", {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: { "Content-type": "application/json" },
    });
    if (result.status === 201) {
     // result.json().then((userinfo) =>  window.localStorage.setItem("IsLoggedIn", userinfo.name));
     // setUserInfo(true)
      setSuccess(true);
    } else if (result.status === 409) {
      setDuplicateName(true);
      setTimeout(() => {
        setDuplicateName(false);
      }, 4000);
    } else {
      console.log(result);
      setMatchPassword(true);
      setTimeout(() => {
        setMatchPassword(false);
      }, 4000);
    }
  };

  if (success) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register">
      <h1>Registration</h1>
      <form className="registerform" onSubmit={RegisterUser}>
        <h2>user name:</h2>
        <p>
          3 - 15 znaků{" "}
          {!regexName.test(name) ? (
            <FontAwesomeIcon icon={faXmark} style={{ color: "#e0101a" }} />
          ) : (
            <FontAwesomeIcon icon={faCheck} style={{ color: "#143d59" }} />
          )}
        </p>
        <input
          type="text"
          placeholder="user name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>email:</h2>
        <input
          type="email"
          placeholder="johnDoe@email.cz"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2>password:</h2>
        <p>
          min délka 6{" "}
          {!regexPassword.test(password) ? 
          (
            <FontAwesomeIcon icon={faXmark} style={{ color: "#e0101a" }} />
          ) : (
            <FontAwesomeIcon icon={faCheck} style={{ color: "#143d59" }} />
          )
          }
        </p>
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h2>confirm password:</h2>
        <input
          type="password"
          placeholder="confirm password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">confirm</button>
        {matchPassword ? <div>invalid confirm password</div> : null}
        {duplicateName ? <div>name already exists</div> : null}
      </form>
    </div>
  );
};

export default Register;
