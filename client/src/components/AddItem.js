import { useCookies } from "react-cookie";
import { useState } from "react";
const AddTask = (setShowAddItem, showAddItem, getData, setBudget, budget) => {
	const [cookie, setCookie, removeCookie] = useCookies();
	const [errors, setErrors] = useState({});
	const [data, setData] = useState({
		description: null,
		price: 0,
		date: new Date(),
		user_id: cookie.id
	});

	const postData = async (e) => {
		//const isValid = validate(data);
		// if (isValid) {}
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVERURL}/list`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data)
				}
			);
			if (response.status === 200) {
				setShowAddItem(false);
				getData();
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	// const validate = (data) => {
	// 	const err = {};
	// 	let isValid = true;

	// 	if (!data.description) {
	// 		err.description = "Items must have a title or description here!";
	// 		isValid = false;
	// 	}
	// 	setErrors(err);
	// 	return isValid;
	// };

	const handleChange = (e) => {
		const { name, value } = e.target;

		setData((data) => ({
			...data,
			[name]: value
		}));
	};

	return (
		<form className="add-form">
			{/* <div className="form-control">
				<label>Budget:</label>
				<input
					type="number"
					name="budget"
					placeholder="Set your budget"
					onChange={setBudget}
				/>
			</div> */}
			<div className="form-control">
				<label>Price:</label>
				{/* {errors.price && <p style={{ color: "red" }}>{errors.price}</p>} */}
				<input
					type="text"
					name="price"
					placeholder="Add Item Price"
					onChange={handleChange}
				/>
			</div>
			<div className="form-control">
				<label>Item:</label>
				{/* {errors.description && (
					<p style={{ color: "red" }}>{errors.description}</p>
				)} */}
				<input
					type="text"
					name="description"
					placeholder="Add an Item"
					onChange={handleChange}
				/>
			</div>
			<input type="submit" onClick={postData} className="btn btn-block" />
		</form>
	);
};

export default AddTask;
