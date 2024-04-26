import "./App.css";
import List from "./Components/List/List";
import Chat from "./Components/Chat/Chat";
import Detail from "./Components/Detail/Detail";


function App() {
  return (
    <div className="mainBody flex justify-center items-center text-white">
      <div className="w-11/12 mx-auto container rounded-lg flex">
        <List/>
        <Chat/>
        <Detail/>
      </div>
    </div>
  );
}

export default App;
