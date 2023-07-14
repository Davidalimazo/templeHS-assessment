"use client";

import { FC, useRef } from "react";
//@ts-ignore
import Carousel, { consts } from "react-elastic-carousel";
import useWindowWidth from "@/hook/useWindowWidth";
import { Avatar } from "@mantine/core";
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import { DoctorType } from "@/types/doctor";
import moment from "moment";
import { months } from "@/assets/data";
import { convertTo12Hour } from "../utils/time_converter";
import Link from "next/link";

const DoctorCard: FC<DoctorType> = ({
  avatar,
  acceptVirtualVisitOnly,
  name,
  title,
  bio,
  availableSlots,
  id,
}) => {
  const width = useWindowWidth();

  const isToday = (dateStr: string) => {
    let momentDate = moment(dateStr).format("LLLL").split(",");
    let dayName = momentDate[0];
    let monthStrSplit = momentDate[1].split(" ");
    let monthIndex = monthStrSplit[1];
    let dayIndex = monthStrSplit[2];
    const getMonth = (month: string) => {
      return months.findIndex((item, _) => item === month);
    };
    let todaydate = moment(dateStr).calendar().split(" ");
    let today = todaydate[0] === "Today";

    return today
      ? "Today"
      : `${dayName.slice(0, 3) + " " + getMonth(monthIndex) + "/" + dayIndex}`;
  };

  //@ts-ignore
  const myArrow = ({ type, onClick, isEdge }) => {
    //@ts-ignore
    const pointer =
      type === consts.PREV ? (
        <PiCaretLeftLight className="w-[25px]" fontSize="25px" />
      ) : (
        <PiCaretRightLight className="w-[25px]" fontSize="25px" />
      );
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  };

  const breakPoints = [
    { width: width < 600 ? 2 : 3, itemsToShow: width < 600 ? 2 : 3 },
  ];

  const onEnd = (next: any, currentIndex: any) => {
    if (currentIndex === 2) {
      if (carouselRef.current) {
        //@ts-ignore
        carouselRef?.current.goTo(0);
      }
    }
  };

  const carouselRef = useRef();

  return (
    <div
      className={`mt-10 mr-[158px] ${
        width > 1280 ? "xl:w-[62.5%]" : ""
      } bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
    >
      <div className=" relative">
        <div
          className={`absolute top-0 right-0 w-[180px] h-[30px] rounded-sm  ${
            acceptVirtualVisitOnly
              ? "bg-green-200 text-green-600 "
              : "bg-blue-200 text-blue-700"
          } font-semibold text-center`}
        >
          {acceptVirtualVisitOnly
            ? "Virtual Visit Only"
            : "In Person Visit only"}
        </div>
      </div>
      <div className="p-5">
        <div className="mt-2 ml-2">
          <div className="flex flex-row items-center gap-2">
            <Avatar
              size={"lg"}
              color="blue"
              radius={"lg"}
              src={avatar}
            ></Avatar>
            <div className="">
              <p className="text-md font-bold">{name}</p>
              <p className="text-sm font-semibold">{title}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 text-[14px]">{bio}</div>
        <div className="mt-5">
          <p className="font-semibold text-sm">Next Available Slots</p>
          <div className="mt-5 flex flex-row gap-4">
            <Carousel
              renderArrow={myArrow}
              breakPoints={breakPoints}
              enableSwipe
              enableMouseSwipe
              showArrows={true}
              itemPadding={[5, 5, 1, 0]}
              //@ts-ignore
              ref={carouselRef}
              onNextEnd={onEnd}
              pagination={false}
            >
              {availableSlots &&
                availableSlots.map(({ date, time }, index) => (
                  <Link
                    href={{
                      pathname: `/${id}`,
                      query: { date, time: convertTo12Hour(time) },
                    }}
                    key={date}
                  >
                    <button
                      className="flex flex-row gap-1 ring-1 ring-gray-300 rounded-full p-2"
                      key={index}
                    >
                      <span className=" text-md font-semibold">
                        {isToday(date)},
                      </span>
                      <span className="">{convertTo12Hour(time)}</span>
                    </button>
                  </Link>
                ))}
            </Carousel>
          </div>
        </div>
        <p className="mt-5 font-semibold text-sm text-green-600">
          Check full profile and availability
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
