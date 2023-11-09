import { ReactDOM } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom/";
import Home from "./pages/home/Home";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
