import { useEffect, useState } from "react";

const PeakGreeting = ({ username }: { username?: string }) => {
    const [timeGreeting, setTimeGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setTimeGreeting("Good Morning");
        else if (hour < 18) setTimeGreeting("Good Afternoon");
        else if (hour < 21) setTimeGreeting("Good Evening");
        else setTimeGreeting("Good Night");
    }, []);

    return (
        <h2 className="pt-12 pl-5 text-2xl md:text-4xl mb-6 font-extrabold">
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-800  bg-[length:200%_100%] animate-[sheen_3s_infinite]">
                {timeGreeting}
            </span>
            <span className="ml-2 text-black dark:text-white">
                , {username ? username : "User"}!
            </span>

            <style jsx>{`
        @keyframes sheen {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
        </h2>
    );
};

export default PeakGreeting;
