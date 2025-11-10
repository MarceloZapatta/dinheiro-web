"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { handleLoginService, LoginData } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm<LoginData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    await handleLoginService(data);
    router.push("/transactions");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <form onSubmit={handleSubmit(handleLogin)} className="w-full">
          <h1 className="text-2xl pb-5">Dinheiro</h1>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              autoFocus
              required
              {...register("email", { required: true })}
            />
          </Field>
          <Field className="pt-4 pb-6">
            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              required
              {...register("password", { required: true })}
            />
          </Field>
          <Button>{loading ? <Spinner /> : "Login"}</Button>
        </form>
      </main>
    </div>
  );
}
