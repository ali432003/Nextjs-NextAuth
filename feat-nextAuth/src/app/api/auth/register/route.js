import bcrypt from "bcrypt"
import connection from "../../../../../utils/db.js";
import { NextResponse } from "next/server";
import User from "../../../../../models/userSchema.js";



export const POST = async (req) => {
    try {

        await connection()
        const { name, email, password } = await req.json()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Fill all required Fields", status: false })

        } else if (!emailRegex.test(email)) {
            return NextResponse.json({ message: "Invalid Email", status: false })

        } else if (password.length < 8) {
            return NextResponse.json({ message: "Invalid password it must contain 8 characters" })

        }
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return NextResponse.json({ message: "User is already exist", status: false })

        }
        const hashPass = await bcrypt.hash(password, 10)
        const obj = { name: name, email: email, password: hashPass }
        const newUser = await User.create(obj)
        return NextResponse.json({ status: true, data: newUser, message: "user created !" })

    } catch (error) {
        return NextResponse.json({ message: error.message, data: [], status: false })
    }

}