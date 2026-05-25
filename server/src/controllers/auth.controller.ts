import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { generateAccessToken } from "../utils/jwt";
import { User } from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const register = async (
	req: Request,
	res: Response
) => {
	try {

		const user = await registerUser(req.body);

		return res.status(201).json({
			success: true,
			data: user
		});

	} catch (error) {

		return res.status(400).json({
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Something went wrong"
		});

	}
};

export const login = async (
	req: Request,
	res: Response
) => {
	try {

		const { email, password } =
			req.body;

		const user =
			await loginUser(
				email,
				password
			);

		const token =
			generateAccessToken(
				user.id
			);

		return res.json({
			success: true,
			token
		});

	} catch (error) {

		return res.status(400).json({
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Something went wrong"
		});

	}
};

export const getCurrentUser = async (
	req: AuthRequest,
	res: Response
) => {
	try {

		const user =
			await User.findById(
				req.userId
			).select("-password");

		return res.json({
			success: true,
			data: user
		});

	} catch {

		return res.status(500).json({
			success: false
		});

	}
};

