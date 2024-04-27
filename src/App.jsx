import "./App.css";
import List from "./Components/List/List";
import Chat from "./Components/Chat/Chat";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Login/Login";
import Notification from "./Components/Notification/Notification";

function App() {
  const user = false;
  return (
    <div className="mainBody flex justify-center items-center text-white">
      <div className="w-11/12 mx-auto container rounded-lg flex">
        {user ? (
          <>
            <List />
            <Chat />
            <Detail />
          </>
        ) : (
          <Login />
        )}
        <Notification/>
      </div>
    </div>
  );
}

export default App;
