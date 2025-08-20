"use client";
import { useRouter } from 'next/navigation';


export default function Home() {
  const navigate = useRouter();

  return (
    <>
      <div className="px-5 ">
        <p>Create, share and take quizzes</p>
        <button className="py-2 px-5 mt-6 bg-indigo-600 rounded-lg text-center text-white cursor-pointer" onClick={() => {
          navigate.push('/create');
        }}>Create Quiz</button>
      </div>
    </>
  );
}
