import { Request, Response, NextFunction } from "express";
import {
  registerSchema,
  loginSchema,
  RegisterInput,
  LoginInput,
} from "../validators/auth.validator";
import {
  registerUser,
  loginUser,
  loginDriver,
} from "../services/auth.service";
import { generateToken, setTokenCookie } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    const result = await registerUser(data);

    if (result.type === "DRIVER") {
      res.status(201).json({
        message: "Driver registered successfully",
        driver: {
          id: result.data.id,
          name: result.data.name,
          phone: result.data.phone,
          licenseNumber: result.data.licenseNumber,
          licenseExpiry: result.data.licenseExpiry,
          status: result.data.status,
        },
      });
      return;
    }

    const token = generateToken(result.data.id, result.data.role);

    setTokenCookie(res, token);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: result.data.id,
        email: result.data.email,
        role: result.data.role,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      const statusMap: Record<string, number> = {
        "User with this email already exists": 409,
        "Driver with this email already exists": 409,
        "Driver with this license number already exists": 409,
        "Driver details (name, phone, licenseNumber, licenseExpiry) are required": 400,
      };
      const status = statusMap[error.message];
      if (status) {
        res.status(status).json({ message: error.message });
        return;
      }
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

export const loginDriverHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    const driver = await loginDriver(data.email, data.password);
    const token = generateToken(driver.id, "DRIVER");

    setTokenCookie(res, token);

    res.json({
      message: "Driver login successful",
      token,
      driver: {
        id: driver.id,
        email: driver.email,
        name: driver.name,
        phone: driver.phone,
        licenseNumber: driver.licenseNumber,
        status: driver.status,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      res.status(401).json({ message: error.message });
      return;
    }
    next(error);
  }
};
