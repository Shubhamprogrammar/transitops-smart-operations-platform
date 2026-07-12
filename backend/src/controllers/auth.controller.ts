import { Request, Response, NextFunction } from "express";
import {
  registerSchema,
  loginSchema,
  RegisterInput,
  LoginInput,
} from "../validators/auth.validator";
import { registerUser, loginUser } from "../services/auth.service";
import { generateToken, setTokenCookie } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data: RegisterInput = parsed.data;
    const user = await registerUser(data);
    const token = generateToken(user.id, user.role);

    setTokenCookie(res, token);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "User with this email already exists") {
      res.status(409).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data: LoginInput = parsed.data;
    const user = await loginUser(data.email, data.password);
    const token = generateToken(user.id, user.role);

    setTokenCookie(res, token);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid email or password") {
      res.status(401).json({ message: error.message });
      return;
    }
    next(error);
  }
};
