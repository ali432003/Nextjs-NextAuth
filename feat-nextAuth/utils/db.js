import mongoose from "mongoose"

const uri = process.env.MONGODB_URI
const connection = async () => {
    try {
        await mongoose.connect(uri)
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
    }
}

export default connection

