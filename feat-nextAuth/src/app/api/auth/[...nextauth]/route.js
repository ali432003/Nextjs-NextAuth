import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connection from "../../../../../utils/db.js";
import User from "../../../../../models/userSchema.js";


const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email) {
                throw new Error("User Not Found");
            }
            await connection()

            // Check if the user already exists
            let user = await User.findOne({ email: profile.email });
            if (!user) {
                // If user does not exist, create a new user with a default password
                const obj = {
                    name: profile.name,
                    email: profile.email,
                    password: "defaultPassword123!" 
                };
                await User.create(obj);
            }
            return true; // Continue the sign-in process
        },
        async redirect({ url, baseUrl }) {
            // Redirect to /dashboard after successful sign-in
            if (url.startsWith(baseUrl)) {
                return `${baseUrl}/dashboard`;
            }
            // Allows relative callback URLs
            else if (url.startsWith("/")) {
                return `${baseUrl}/dashboard`;
            }
            return baseUrl;
        },
        async session({ session, token }) {
            await connection();

            // Retrieve the user from the database
            const user = await User.findOne({ email: session.user.email });

            // Add the user object to the session
            session.user = {
                ...session.user,
                id: user._id,
                name: user.name,
                email: user.email
            };

            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
