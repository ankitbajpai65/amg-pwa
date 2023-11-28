import { Outlet } from "react-router-dom";
import Header from "../components/appComponents/Header";
import Footer from "../components/appComponents/Footer";

function Layout() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
