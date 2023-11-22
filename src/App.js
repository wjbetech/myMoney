import { ReactDOM } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom/";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import NavBar from "./components/NavBar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
	const { authReady, user } = useAuthContext();

	return (
		<div>
			{authReady && (
				<>
					<BrowserRouter>
						<NavBar />
						<div className="">
							<Route exact path="/">
								{user ? <Home /> : <Redirect to="/login" />}
							</Route>
							<Route exact path="/login">
								{!user ? <Login /> : <Redirect to="/" />}
							</Route>
							<Route exact path="/signup">
								{!user ? <Signup /> : <Redirect to="/" />}
							</Route>
						</div>
					</BrowserRouter>
				</>
			)}
		</div>
	);
}

export default App;
