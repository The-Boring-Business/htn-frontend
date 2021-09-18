import Dashboard from "./Dashboard";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex height-screen">

      <div className="flex-auto">
        <div>
          <Header />
        </div>

        <div className=" overflow-hidden w-full ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;