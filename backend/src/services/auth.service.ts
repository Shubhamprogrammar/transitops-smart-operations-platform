import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { RegisterInput } from "../validators/auth.validator";

export const registerUser = async (data: RegisterInput) => {
  if (data.role === "DRIVER") {
    // Validate driver-specific fields
    if (!data.name || !data.phone || !data.licenseNumber || !data.licenseExpiry) {
      throw new Error(
        "Driver details (name, phone, licenseNumber, licenseExpiry) are required",
      );
    }

    const existingDriver = await prisma.driver.findFirst({
      where: {
        OR: [
          { email: data.email },
          { licenseNumber: data.licenseNumber },
        ],
      },
    });

    if (existingDriver) {
      if (existingDriver.email === data.email) {
        throw new Error("Driver with this email already exists");
      }
      throw new Error("Driver with this license number already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const driver = await prisma.driver.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        phone: data.phone,
        licenseNumber: data.licenseNumber,
        licenseExpiry: new Date(data.licenseExpiry),
        status: "AVAILABLE",
      },
    });

    return { type: "DRIVER" as const, data: driver };
  }

  // Non-DRIVER: create User as before
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  return { type: "USER" as const, data: user };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return user;
};

export const loginDriver = async (email: string, password: string) => {
  const driver = await prisma.driver.findUnique({ where: { email } });

  if (!driver) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, driver.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return driver;
};
