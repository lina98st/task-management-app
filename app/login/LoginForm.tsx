"use client";

import { useActionState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginUser } from "./actions";

export default function LoginForm() {
  const [state, formAction] = useActionState(loginUser, null);

  return (
    <form action={formAction}>
      {state?.error && (
        <p className="mb-5 text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-white"
        >
          Email
        </label>

        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-white"
        >
          Password
        </label>

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          required
        />
      </div>

      <Button type="submit" fullWidth>
        Sign in
      </Button>
    </form>
  );
}
