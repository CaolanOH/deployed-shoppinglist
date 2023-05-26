import { useEffect } from "react";
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

const App = () => {
	const [cookie, setCookie, removeCookie] = useCookies(null);
	const [listItems, setListItems] = useState(null);
	const [showAddItem, setShowAddItem] = useState(false);
	// const [budget, setBudget] = useState(0.0);

	const authToken = cookie.AuthToken;
	const id = cookie.id;
	const userName = cookie.name;

	const logout = () => {
		removeCookie("email");
		removeCookie("AuthToken");
		googleLogout();
	};

	const getData = async () => {
		try {
			const responseFromAPI = await fetch(
				`${process.env.REACT_APP_SERVERURL}/list/${id}`
			);
			const data = await responseFromAPI.json();
			setListItems(data);
		} catch (error) {
			console.error(error.getmessage);
		}
	};

	const deleteAll = async () => {
		console.log("delete everything");
		console.log(JSON.stringify(listItems));
		const listItemIds = listItems.map((listItems) => listItems.id);
		console.log(listItemIds);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVERURL}/list/all`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(listItemIds)
				}
			);
			if (response.status === 200) {
				getData();
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const sortedList = listItems?.sort(
		(a, b) => new Date(a.date) - new Date(b.date)
	);

	useEffect(() => {
		if (authToken) {
			getData();
		}
	}, [authToken]);

	return (
		<div className="container">
			{!authToken && <Auth />}
			{authToken && (
				<>
					<ListHeader
						getData={getData}
						logout={logout}
						onAdd={() => setShowAddItem(!showAddItem)}
						showAdd={showAddItem}
						deleteAll={deleteAll}
						userName={userName}
					/>
					{showAddItem && (
						<AddItem
							setShowAddItem={setShowAddItem}
							showAddItem={showAddItem}
							getData={getData}
							// budget={budget}
							// setBudget={setBudget}
						/>
					)}
					{sortedList?.map((listItem) => (
						<ListItem
							key={listItem.id}
							listItem={listItem}
							getData={getData}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default App;
