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
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneRegex = /^\+?[0-9]\d{1,20}$/;
    const trimmedPhoneNumber = phoneNumber.replace(/\s+/g, "");
    const result = trimmedPhoneNumber.match(phoneRegex);
    const formData = {
      username: name,
      email: email,
      password: password,
      address: address,
      phoneNumber: trimmedPhoneNumber,
    };

    const isValid = validateRegisterForm(formData);

    if (!isValid) {
      setErrors(["All fields must be filled out"]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    } else {
      if (result) {
        const res = await registerUser(formData);
        if (res.error) {
          setErrors(res.error.message);
          setTimeout(() => {
            setErrors([]);
          }, 3000);
        }
      } else {
        setErrors(["Phone number does not match the regex pattern"]);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      }
    }
  };

  return (
    <>
      {errors.length > 0 && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] w-[95%] max-w-[400px] z-50 flex flex-col items-center py-6 bg-red-500">
          {errors}
        </div>
      )}
      <div className="relative min-h-[calc(100vh-4rem)]">
        <form
          onSubmit={handleSubmit}
          className="absolute top-[calc(50%+4rem)] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] max-w-[400px] flex flex-col justify-center items-center space-y-6"
        >
          <h1 className="text-2xl">Register</h1>
          <div className="flex flex-col w-full space-y-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              required
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
              required
            />
          </div>
          <div className="flex flex-col w-full space-y-3">
            <label htmlFor="phoneNumber">phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(e.target.value)
              }
              required
            />
          </div>

          <button type="submit" className="btnCtaWide">
            Register
          </button>
          <p>
            already have a user?{" "}
            <Link href={"/login"} className="text-fourthClr">
              Login&gt;&gt;
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
