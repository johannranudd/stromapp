"use client";
import { registerUser } from "@/app/utils/posts";
import Link from "next/link";
import { useState } from "react";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = {
      username: name,
      email: email,
      password: password,
      address: address,
    };
    console.log(formData);
    formData && registerUser(formData);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <form
        onSubmit={handleSubmit}
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-100%] flex flex-col justify-center items-center w-[95%] max-w-[400px] border"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />

        <button type="submit">Register</button>
        <p>
          already have a user? <Link href={"/login"}>Login&gt;&gt;</Link>
        </p>
      </form>
    </div>
  );
}
