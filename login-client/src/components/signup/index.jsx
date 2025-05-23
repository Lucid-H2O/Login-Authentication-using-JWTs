import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return(
		<div className="flex items-center justify-center min-h-screen">
			<div className="">
				<div className="p-6 rounded-2xl bg-blue-50">
					<form className='w-[20vw] text-xl flex flex-col gap-4' onSubmit={handleSubmit}>
						<h1 className="mx-auto text-2xl ">Create Your Account</h1>
						<input
							className="bg-blue-100 rounded p-2"
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							
						/>
						<input
							className="bg-blue-100 rounded p-2"
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							
						/>
						<input
							className="bg-blue-100 rounded p-2"
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							
						/>
						<input
							className="bg-blue-100 rounded p-2"
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							
						/>
						{error && <div className="text-red-600 text-sm">{error}</div>}
						<button className="p-2 text-lg bg-[#4fbf40] rounded-md hover:opacity-80" type="submit" >
							Sign Up
						</button>
					</form>
				</div>
				<div className="flex flex-row mt-8 p-4 rounded-2xl bg-blue-50 gap-2 text-sm">
					<h1>Already have an account?</h1>
					<Link to="/login">
						<button className="text-blue-600 hover:underline" type="button" >
                        Click here to log in.
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;