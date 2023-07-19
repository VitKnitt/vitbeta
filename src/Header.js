import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import logo from './images/logo.png'

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [activeHmaburger, setActiveHamburger] = useState(false);
  const [activeNavMenu, setactiveNavMenu] = useState(false);
  const [userRole, setUseRole] = useState("");

 
useEffect(() => { 
   const isLooged = async () => {
    const result = await fetch("https://vit-betatest.onrender.com/islloged", {
      method: "POST",
      credentials: "include",
    });
    if (result.ok) {        
      result.json().then(result => (setUserInfo(result.name),
      setUseRole(result.role)))
    } else {
      console.log("unauthorized");
    }
  };
  isLooged()
},[])  
  

  const handleLogOut = async () => {
    const result = await fetch("https://vit-betatest.onrender.com/logout", {
      method: "POST",
      credentials: "include",
    });
    if (result.ok) {    
    
     setUserInfo("");      
    console.log("logged out")
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
            { userRole === "admin" ? 
            (
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
            </>)
             : null}
          </div>
          <div className="login">
            {!userInfo ? (
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
                <div className="login-name" style={{ color: "#f4b41a" }}>{userInfo}</div>
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
