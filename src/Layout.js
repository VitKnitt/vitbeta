import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const Layout = () => {

  return (
    <main>
      <Header />
      <div className="rest">
      <Outlet />
      </div>
      <Footer />
    </main>
  )
};

export default Layout;
