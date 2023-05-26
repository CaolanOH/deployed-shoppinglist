import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GoogleOAuthProvider clientId="362206601607-ml5g9rhb6qq4n1m6dnoqb6mqapo1dm33.apps.googleusercontent.com">
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</GoogleOAuthProvider>
);
