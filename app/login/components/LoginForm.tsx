"use client";
import { validateForm } from "@/app/utils/generics";
import { login } from "@/app/utils/posts";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      identifier: email,
      password: password,
    };

    const isValid = validateForm(formData);
    if (!isValid) {
      setErrors(["All fields must be filled out"]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    } else {
      const res = await login(formData);
      if (res.error) {
        console.log(res);
        setErrors(res.error.message);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      }
    }
  };

  return (
    <>
      {errors.length > 0 && (
        <div className="absolute top-[25%] left-[50%] translate-x-[-50%]  w-full max-w-[400px] z-50 flex flex-col items-center py-6 bg-red-500">
          <p>{errors}</p>
        </div>
      )}
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
    </>
  );
}
