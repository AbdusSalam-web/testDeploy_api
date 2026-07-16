const { z } = require("zod");

const signUpSchema = z.object({
  userName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "UserName must be at least 3 characters long." })
    .max(50, { message: "UserName must not exceed 50 characters." }),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(50, { message: "Email must not exceed 50 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not exceed 20 characters" })
    .regex(/^\+?[0-9\s\-()]+$/, { message: "Invalid phone number format" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 7 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    }),
});

module.exports = { signUpSchema };
