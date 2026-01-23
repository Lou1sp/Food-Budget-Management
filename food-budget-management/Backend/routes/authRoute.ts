import { Router } from "express";
import { signUp } from "../controllers/signupController";


const router = Router();

//Defining Routes
//Whenever Client call API POST /signup, it runs function signup in Controller
router.post("/signup", signUp);

export default router;
