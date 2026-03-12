import { Router } from "express";
import { signUp } from "../controllers/authController/signupController";
import { login } from "../controllers/authController/loginController";
const router = Router();

//Defining Routes
//Whenever Client call API POST /api/auth/signup, it runs function signup in Controller
router.post("/signup", signUp);
//Whenever Client call API POST /api/auth/login, it runs function login in Controller
router.post("/login", login)

//Let's say in the future you have to go to getBudget controller 
//route.get("/budget", authMiddleware, getBudget);
//However, this is just route for auth. In the future, you will have to create other route files for other purposes, and don't forget to add route in app.ts

export default router;
