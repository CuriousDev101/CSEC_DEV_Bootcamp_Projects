const baseUrl = "http://localhost:3000";

export const registerUser = async (userData: any) => {
	const res = await fetch(`${baseUrl}/users`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userData),
	});
	if (!res.ok) throw new Error("Registration failed");
	return res.json();
};

export const loginUser = async (credentials: {
	email: string;
	pass: string;
}) => {
	const res = await fetch(
		`${baseUrl}/users?email=${credentials.email}&password=${credentials.pass}`,
	);
	if (!res.ok) throw new Error("Login failed");

	const users = await res.json();
	if (users.length === 0) throw new Error("Invalid email or password");

	return users[0];
};
