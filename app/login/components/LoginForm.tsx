"use client";
import { login } from "@/app/utils/posts";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      identifier: email,
      password: password,
    };

    formData && login(formData);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <form
        onSubmit={handleSubmit}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-100%] flex flex-col justify-center items-center w-[95%] max-w-[400px] border"
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log in</button>
        <p>
          dont have a user? <Link href={"/register"}>Register&gt;&gt;</Link>
        </p>
      </form>
    </div>
  );
}
