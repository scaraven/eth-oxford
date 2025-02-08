"use client";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import heroMinaLogo from "../public/assets/hero-mina-logo.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        Cryptographical Primitives on Mina
      </h1>
      <Image
        className={styles.logo}
        src={heroMinaLogo}
        alt="Mina Logo"
        width="191"
        height="174"
        priority
      />
      <div className="px-6 py-3 mt-4 text-xl font-semibold text-white bg-blue-600 rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
        <Link href="/aes_demo">AES</Link>
      </div>
    </div>
  );
}
