import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import logo from "./images/logo.png";
import { selectUrl } from './features/url/urlSlice'
import { useSelector,useDispatch } from "react-redux";
import { saveUsersName } from "./features/users/usersSlice"; 
import Cookies from 'js-cookie';


const Header = () => {
  const URL = useSelector(selectUrl);
  const userName = useSelector(state => state.users.name)
  const token = useSelector(state => state.users.cookie)
  const dispatch = useDispatch()  
  
  const [activeHmaburger, setActiveHamburger] = useState(false);
  const [activeNavMenu, setactiveNavMenu] = useState(false);
  
  const [userRole, setUseRole] = useState(""); //userContext
  const { userInfo, setUserInfo } = useContext(UserContext);


  useEffect(() => {
    const isLooged = async () => {      
      const result = await fetch(URL + "islogged", {
        method: "POST",
        body: JSON.stringify({token}),
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      if (result.ok) {
        result
          .json()
          .then(result => (dispatch(saveUsersName(result.name)), setUseRole(result.role))
         //   .then(result => (setUserInfo(result.name), setUseRole(result.role))
          );         
      } else {
        console.log("not logged in");
      }
    };
    isLooged();
  }, []);

  const handleLogOut = async () => {
    const result = await fetch(URL + "logout", {
      method: "POST",
      credentials: "include",
    });
    if (result.ok) {
      setUserInfo("");
      dispatch(saveUsersName(""))
      Cookies.set('token',"")
      console.log("logged out");
    } else {
      console.log("error :(");
    }
  };

  const showMenu = () => {
    setActiveHamburger((current) => !current);
    setactiveNavMenu((current) => !current);
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="nav-branding">
          <img src={logo} alt="logo" />
        </Link>
        <ul className={activeNavMenu ? "nav-menu" : "nav-menu-non"}>
          <div className="nav-menu-list">
            <li className="nav-item">
              <Link to="/paintings" className="nav-link">
                obrazy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books" className="nav-link">
                knihy
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                kontakt
              </Link>
            </li>
            {userRole === "admin" ? (
              <>
                <li className="nav-item">
                  <Link to="/postpainting" className="nav-link">
                    post-painting
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/PostBlog" className="nav-link">
                    post-blog
                  </Link>
                </li>
              </>
            ) : null}
          </div>
          <div className="login">
            {!userName ? (
              <>
                <Link to="/login" className="nav-link">
                  login
                </Link>
                <Link to="/register" className="nav-link">
                  register
                </Link>
              </>
            ) : (
              <div>
                <div className="login-name" style={{ color: "#f4b41a" }}>
                  {userName}
                </div>
                <button onClick={handleLogOut}>logout</button>
              </div>
            )}
          </div>
        </ul>
        <div
          onClick={() => showMenu()}
          className={activeHmaburger ? "hamburger" : "nothamburger"}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
