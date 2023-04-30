"use client";
import { registerUser } from "@/app/utils/posts";
import Link from "next/link";
import { useState } from "react";
import { validateRegisterForm } from "@/app/utils/generics";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const phoneRegex = /^\+?[0-9]\d{1,20}$/;
    const trimmedPhoneNumber = phoneNumber.replace(/\s+/g, "");
    const result = trimmedPhoneNumber.match(phoneRegex);
    if (result) {
      console.log("Phone number matches the regex pattern");
      const formData = {
        username: name,
        email: email,
        password: password,
        address: address,
        phoneNumber: trimmedPhoneNumber,
      };
      const isValid = validateRegisterForm(formData);
      isValid && registerUser(formData);
    } else {
      console.log("Phone number does not match the regex pattern");
    }
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
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label htmlFor="phoneNumber">phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
