import { useNavigate } from "react-router-dom";

function Home(props) {
  let navigate = useNavigate();
  function navigateToUser() {
    navigate("/user");
  }
  return (
    <div>
      <p>Home</p>
      <button onClick={navigateToUser}>跳转到/user</button>
    </div>
  );
}

export default Home;
