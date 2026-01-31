"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "main">("intro");

  const handleLogin = () => {
    router.push("/example");
  };

  // Move from centered intro to the normal layout after the intro finishes.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPhase("main");
      return;
    }

    const timeout = window.setTimeout(() => setPhase("main"), 1700);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center items-start">
        <div
          className={`text-left transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${phase === "intro" ? "translate-y-0" : "-translate-y-24"
            }`}
        >
          <div className="text-4xl font-bold text-gray-800 mb-2">내 아이가</div>
          <div className="text-4xl font-bold text-orange-400 mb-2">
            <span className="reveal-fade-left">되도록</span>
          </div>
          <div className="text-4xl font-bold text-gray-800">
            행복했으면 좋겠으니까
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col gap-4 overflow-hidden transition-[max-height,opacity,transform] duration-700 ease-out ${phase === "intro"
          ? "max-h-0 opacity-0 translate-y-2 pointer-events-none"
          : "max-h-[320px] opacity-100 translate-y-0"
          }`}
      >
        <button onClick={handleLogin} className="w-full bg-yellow-300 text-black py-4 px-6 rounded-xl flex items-center text-base font-medium relative">
          <Image src="/kakao_logo.svg" alt="KakaoTalk" width={20} height={20} className="absolute left-6" />
          <span className="flex-1 text-center">카카오로 계속하기</span>
        </button>

        <button onClick={handleLogin} className="w-full bg-green-500 text-white py-4 px-6 rounded-xl flex items-center text-base font-medium relative">
          <Image src="/naver_logo.svg" alt="Naver" width={20} height={20} className="absolute left-6" />
          <span className="flex-1 text-center">네이버로 계속하기</span>
        </button>

        <button onClick={handleLogin} className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-xl flex items-center text-base font-medium relative">
          <Image src="/google_logo.svg" alt="Google" width={20} height={20} className="absolute left-6" />
          <span className="flex-1 text-center">구글로 계속하기</span>
        </button>
      </div>
    </main>
  );
}