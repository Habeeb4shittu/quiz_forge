"use client";

import { logout } from "@/lib/api/auth";
import Image from "next/image";
import { toast } from "sonner";

export default function Home() {
  const handleLogout = async () => {
    const response = await logout();

    toast.success("Logout Successful")
    window.location.href = '/login';
  };
  return (
    <>
      <div>Home</div>
      <button className="bg-amber-400 px-3 py-2 rounded-2xl cursor-pointer" onClick={handleLogout}>Logout</button>
    </>
  );
}
