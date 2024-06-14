import User from "../../../../../models/userSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import connection from "../../../../../utils/db.js";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    await connection()
    try {
        const { email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json({ message: "Fill All Fields" })

        }
        const userExist = await User.findOne({ email: email })
        if (!userExist) {
            return NextResponse.json({ message: "user not found" })

        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (isMatch) {
            const token = jwt.sign({ _id: userExist._id, email: userExist.email }, process.env.PRIVATE_KEY)
            return NextResponse.json({ status: true, data: userExist, message: "User logged in successfully", token });
        } else {
            return NextResponse.json({ status: false, data: [], message: "Incorrect password" });
        }
    } catch (error) {
        return NextResponse.json({ status: false, message: error.message, data: [] })

    }
}
