"use client";

import { FC } from "react";
import { PiCaretLeft } from "react-icons/pi";
import { useRouter } from "next/navigation";

interface LandingPageProps {
  component: string;
  isHome?: boolean;
}

const Sidebar: FC<LandingPageProps> = ({ component, isHome }) => {
  const router = useRouter();
  return (
    <div>
      {!isHome ? (
        <div
          className="flex flex-row items-center gap-2 font-semibold mb-10 cursor-pointer"
          onClick={() => router.back()}
        >
          <PiCaretLeft fontSize="19px" /> <span>Go back</span>
        </div>
      ) : null}
      <div className="font-bold text-2xl w-[300px]">{component}</div>
    </div>
  );
};

export default Sidebar;
