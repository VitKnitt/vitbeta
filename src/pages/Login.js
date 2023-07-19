import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loged, setLoged] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("https://vitbeta-api.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if (response.status === 200) {
      console.log("ok");
      response
        .json()
        .then((userinfo) =>
        setUserInfo( userinfo.name)
        );      
      setLoged(true);
    } else {
      setWrongCredentials(true);
    }
  };

  if (wrongCredentials) {
    setTimeout(() => {
      setWrongCredentials(false);
    }, 4000);
  }

  if (loged) return <Navigate to="/" />;

  return (
    <div className="login-page">
      <h1>Log in</h1>
      <form onSubmit={login} type="submit" className="loginform">
        <h2>jméno:</h2>
        <input
          type="text"
          name="name"
          className="logininput"
          placeholder="user name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>heslo:</h2>
        <input
          type="password"
          name="pwd"
          className="logininput"
          required
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
        <Link to="/forgotpassword">zapomenuté heslo</Link>
      </form>
        {wrongCredentials && <p>špatné heslo nebo jméno</p>}
    </div>
  );
};

export default Login;