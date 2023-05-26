/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import CsButton from "@/components/CsButton";
import HeaderFooterMenuLink from "@/components/HeaderFooterMenuLink";
import { useMe } from "@/hooks/useMe";
import Logo from "@/images/Logo.svg";
import { getPrettyUserName } from "@/utils/platform-helper";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { status } = useSession();

  const me = useMe();

  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    if (me) {
      setUserFullName(getPrettyUserName(me.first_name, me.last_name));
    }
  }, [me]);

  return (
    <header className="py-4 lg:mb-4">
      <div className="container flex items-center">
        <div className="flex flex-wrap">
          <Link className="mr-14 flex flex-wrap items-center" href="/">
            <Image className="mr-8 block h-7 w-auto" src={Logo} alt="" />
          </Link>

          <div className="hidden flex-wrap items-center justify-center lg:flex">
            <div>
              <ul className="flex flex-wrap gap-x-14">
                <HeaderFooterMenuLink href="/" text="Главная" />
                <HeaderFooterMenuLink href="/platforms" text="Площадки" />
              </ul>
            </div>
          </div>
        </div>
        <div className="ml-auto hidden flex-wrap items-center justify-end gap-x-8 text-lg font-semibold lg:flex">
          {status !== "authenticated" && (
            <>
              <CsButton type="link" href="/user/register">
                Регистрация
              </CsButton>
              <CsButton type="link" href="/user/login">
                Войти
              </CsButton>
            </>
          )}
          {status === "authenticated" && userFullName !== "" && (
            <>
              <CsButton type="link" href="/user/">
                {userFullName}
              </CsButton>
              <CsButton
                onClick={() => {
                  void signOut({ callbackUrl: "/" });
                }}
              >
                Выйти
              </CsButton>
            </>
          )}
        </div>
        <div className="ml-auto block lg:hidden">
          <Hamburger toggled={isMenuOpen} toggle={setMenuOpen} color="#fff" />
        </div>
      </div>
    </header>
  );
}
