import LoginForm from "@/components/LoginForm";
import { SessionProvider } from "next-auth/react"

export default function Home() {
  return (
    <h1>

      <LoginForm />

    </h1>
  );
}
