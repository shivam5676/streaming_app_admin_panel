import BigScreenSideBar from "./components/BigScreenSideBar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-[#222736] w-[100vw] h-[100vh]">
      <Navbar></Navbar>
      <div className="flex h-[calc(100vh-70px)]">
        <BigScreenSideBar />
      </div>
    </div>
  );
}

export default App;
