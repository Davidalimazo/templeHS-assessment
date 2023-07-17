"use client";

import { Avatar } from "@mantine/core";
import { FC } from "react";
import { GoBell } from "react-icons/go";
import avatar from "@/assets/images/avatar.png";

interface HeadingProps {}

const Heading: FC<HeadingProps> = ({}) => {
  return (
    <div>
      <div className="bg-[#F8F7F7] h-[70px] font-nunito text-sm font-semibold flex flex-row items-center justify-between py-3 px-10 w-full">
        <div className="">Schedule Appointments</div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <GoBell size={18} />{" "}
            <Avatar size={"md"} color="blue" radius={"lg"} src={avatar.src} />
          </div>
          <div className="">
            <p className="font-bold">Pelumi Alesh</p>
            <p className="text-sm text-gray-400 font-semibold">
              pelumi.al@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
