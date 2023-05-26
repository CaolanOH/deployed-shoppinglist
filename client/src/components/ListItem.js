import { FaTrashAlt } from "react-icons/fa";

const ListItem = ({ listItem, getData }) => {
	const deleteItem = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVERURL}/list/${listItem.id}`,
				{
					method: "DELETE"
				}
			);
			if (response.status === 200) {
				getData();
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<li className="list-item">
			<div className="info-container">
				<h4>{listItem.description}</h4>
			</div>
			<div>
				<p>€{listItem.price}</p>
			</div>
			<div className="button-container">
				<FaTrashAlt
					color="#ff0021"
					onClick={deleteItem}
					style={{ cursor: "pointer" }}
				/>
			</div>
		</li>
	);
};

export default ListItem;
