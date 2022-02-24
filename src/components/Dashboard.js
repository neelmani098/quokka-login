import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    // localStorage.setItem("loggedIn", false);
    props.logout(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div>Hey Welcome to dashboard page!</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={onLogoutHandler}
      >
        Sign Out
      </button>
    </>
  );
};

export default Dashboard;
