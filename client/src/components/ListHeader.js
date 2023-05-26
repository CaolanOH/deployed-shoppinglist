import { useCookies } from "react-cookie";
const ListHeader = ({
	logout,
	showAdd,
	onAdd,
	deleteAll,
	userName,
	getData
}) => {
	return (
		<header>
			<div className="header">
				{/* <h1>Budget: €{budget}</h1> */}
				<h1>Welcome {userName} !</h1>
				<button className="btn logout" onClick={logout}>
					Log out
				</button>
			</div>
			<div className="header-button-container">
				<button
					className={showAdd ? "btn close" : "btn add"}
					onClick={onAdd}
				>
					{showAdd ? "Close" : "Add"}
				</button>
				{/* <button className="btn get-all" onClick={getData}>
					Get Tasks
				</button> */}
				<button className="btn delete" onClick={deleteAll}>
					DELETE ALL
				</button>
			</div>
		</header>
	);
};

export default ListHeader;
