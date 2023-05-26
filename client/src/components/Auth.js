import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";

import { FaList } from "react-icons/fa";

const Auth = ({ onAuthenticated }) => {
	const [cookie, setCookie, removeCookie] = useCookies();

	const login = async (responseFromGoogle) => {
		const { email, name } = jwt_decode(responseFromGoogle.credential);
		try {
			const responseFromApi = await fetch(
				`${process.env.REACT_APP_SERVERURL}/users/login`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email })
				}
			);
			const json = await responseFromApi.json();
			setCookie("id", json.id);
			setCookie("name", name);
			setCookie("email", email);
			setCookie("budget", json.budget);
			setCookie("AuthToken", responseFromApi.credential);
			//window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="listIcon">
			<div>
				<FaList size="6em" />
			</div>
			<h1>Listy</h1>
			<div>
				<h3>Sign in with your google account!</h3>
				<GoogleLogin onSuccess={login} />
			</div>
		</div>
	);
};

export default Auth;
