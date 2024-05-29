"use client";

import Button from "@/components/externals/Button";
import InputPassword from "@/components/externals/inputs/InputPassword";
import InputText from "@/components/externals/inputs/InputText";
import { isInvalidForm } from "@/utils/frontend";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "phosphor-react";
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { ChangeEvent } from "react";

type LoginInput = {
  username: string;
  password: string;
};

type PageProps = {
  searchParams: { error?: string };
};
export default function LoginPage({ searchParams }: PageProps) {
  // const searchParams = useSearchParams();

  // /**
  //  * State declaration
  //  */
  // const [FormLogin, setFormLogin] = useState({});

  // /**
  //  * Function handler
  //  */
  // function onSubmitLogin(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   window.location.href = "/";
  // }
  const [FormLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormLogin((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn("credentials", {
      username: FormLogin.username,
      password: FormLogin.password,
      callbackUrl: "/",
    });
  };

  /**
   * Render JSX
   */
  return (
    <section className="h-screen flex sm:pb-[6rem] pb-[4rem] px-4 bg-[var(--color-bg-default)]">
      <div className="card max-w-lg m-auto rounded-lg">
        <div className="card-body p-8">
          <div className="mb-[3rem] flex items-center gap-3">
            <div
              className="h-[3.5rem] bg-profile"
              style={{
                backgroundImage: "URL(/public/logo/logo-smkn-jenangan.png)",
              }}
            />
            <div>
              <div className="text-xl mt-[.15rem]">SIMBAH</div>
              <div className="text-sm mt-1 font-normal">SMKN 1 JENANGAN</div>
            </div>
          </div>

          <div className="mb-[.75rem]">
            <div className="text-xl">Masuk ke akun pengguna</div>
            <div className="text-xs text-gray-700 mt-1">
              Jaga username dan password anda tetap aman
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mb-[3rem]">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              required
              value={FormLogin.username || ""}
              onChange={handleChange}
              className="float-label"
            />
            <div className="flex gap-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                value={FormLogin.password || ""}
                onChange={handleChange}
                className="grow float-label"
              />
              <Button
                className="btn-outline aspect-square px-2 text-sm mt-[1.5rem] bg-primary text-contras-primary disabled:border-gray-200 disabled:bg-white disabled:text-gray-300"
                text={<ArrowRight weight={"light"} />}
              />
            </div>
            {searchParams.error && (
              <p className="text-red-600 text-center capitalize">
                Login failed.
              </p>
            )}
          </form>
          <div>
            <p className="text-center text-gray-500 text-xs">
              &copy;{new Date().getFullYear()} SMKN 1 Jenangan Ponorogo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
