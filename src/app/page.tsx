"use client";

import { logout } from "@/lib/api/auth";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';


export default function Home() {
  const navigate = useRouter();

  return (
    <>
      <div className="pt-12 md:pt-28 px-5 ">
        <h1 className="text-4xl font-semibold mb-4">Welcome to QuizForge</h1>
        <p>Create, share and take quizzes</p>
        <button className="py-2 px-5 mt-6 bg-indigo-600 rounded-lg text-center text-white cursor-pointer" onClick={() => {
          navigate.push('/create');
        }}>Create Quiz</button>
      </div>
    </>
  );
}
