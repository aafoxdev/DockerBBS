"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from '@/img/DockerBBS.png'


export default function Header() {
  const [isOpen, setOpen] = useState(false); // 型アノテーションを削除
  const handleMenuOpen = () => {
    setOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <header className="py-6 px-4 flex justify-between items-center">
      <Link href="/" onClick={handleMenuClose}>

        <Image src={logo} width={100} height={100} alt="Tailwind CSS" />

      </Link>

      <nav
        className={
          isOpen
            ? "z-40 bg-blue-100 fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col"
            : "fixed right-[-100%] md:right-4"
        }
      >
        <ul
          className={
            isOpen
              ? "flex h-screen justify-center items-center flex-col gap-6 text-xl"
              : "block md:flex md:gap-8"
          }
        >
          <li>
            <Link href="/" onClick={handleMenuClose}>
            <div className="text-lg hover:text-blue-500">Home</div>
            </Link>
          </li>
          <li>
            <Link href="/log" onClick={handleMenuClose}>
            <div className="text-lg hover:text-blue-500">Log</div>
            </Link>
          </li>
          <li>
            <a href="https://aafox.net" target="_blank" rel="noopener noreferrer" onClick={handleMenuClose}>
            <div className="text-lg hover:text-blue-500">Link</div>
            </a>
          </li>
        </ul>
      </nav>
      <button className="z-50 space-y-2 md:hidden fixed top-6 right-4" onClick={handleMenuOpen}>
        <span
          className={
            isOpen
              ? "block w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            isOpen ? "block opacity-0 duration-300" : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            isOpen
              ? "block w-8 h-0.5 bg-gray-600 -rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
      </button>
    </header>
  );
}
