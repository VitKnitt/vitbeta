import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUrl } from "../features/url/urlSlice";
import Cookies from "js-cookie";
import { saveUsersName } from "../features/users/usersSlice";

const Login = () => {
  const URL = useSelector(selectUrl);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [logged, setLogged] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const dispatch = useDispatch();
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    try{
    const response = await fetch(URL + "login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    if (response.status === 200) {
      console.log("ok");
      response
        .json()
        .then(
          (userinfo) => (
            dispatch(saveUsersName(userinfo.name)),
            setUserRole(userinfo.role),
            Cookies.set("token", userinfo.token, { expires: 30 })
          )
        );        
        setLogged(true);
    } else if (response.status === 400) {
      setWrongCredentials(true);
    } else {
      console.log("internal error");
    }
  } catch(err){
    console.log('error during login:', err)
  }
  };

 

  if (wrongCredentials) {
    setTimeout(() => {
      setWrongCredentials(false);
    }, 4000);
  }

  if (logged){
    if(userRole === "admin"){
      window.location.reload()
    }else{
    return <Navigate to="/" />}
  };

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
