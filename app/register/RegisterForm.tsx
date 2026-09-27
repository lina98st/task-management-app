"use client";

import { useActionState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { registerUser } from "./actions";

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerUser, null);

  return (
    <form action={formAction}>
      {state?.error && (
        <p className="mb-5 text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-white"
        >
          Name
        </label>

        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
        />
      </div>

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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          required
        />

        <p className="mt-2 text-xs text-[var(--text-muted)]">
          Use at least 8 characters.
        </p>
      </div>

      <Button type="submit" fullWidth>
        Create account
      </Button>
    </form>
  );
}
