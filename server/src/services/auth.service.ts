import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { CreateUserDto } from "../types/user.types";

export const registerUser = async (
	payload: CreateUserDto
) => {

	const existingUser = await User.findOne({
		email: payload.email
	});

	if (existingUser) {
		throw new Error("User already exists");
	}

	const hashedPassword = await bcrypt.hash(
		payload.password,
		10
	);

	const user = await User.create({
		name: payload.name,
		email: payload.email,
		password: hashedPassword
	});

	return user;
};

export const loginUser = async (
	email: string,
	password: string
) => {

	const user = await User.findOne({ email });

	if (!user) {
		throw new Error(
			"Invalid credentials"
		);
	}

	const isPasswordValid =
		await bcrypt.compare(
			password,
			user.password
		);

	if (!isPasswordValid) {
		throw new Error(
			"Invalid credentials"
		);
	}

	return user;
};
