"use client";

import { FC, useEffect, useState } from "react";
import useWindowWidth from "@/hook/useWindowWidth";
import { Avatar, Checkbox } from "@mantine/core";
import { DoctorType } from "@/types/doctor";
import moment from "moment";
import { doctorsData } from "@/assets/data";
import Loader from "./Loader";
import { SlCalender } from "react-icons/sl";
import { AiOutlineClockCircle, AiOutlineCreditCard } from "react-icons/ai";
import { BsBell } from "react-icons/bs";

interface Props {
  doctorId: number;
  date: string;
  time: string;
}

const AppointmentCard: FC<Props> = ({ doctorId, date, time }) => {
  const [data, setData] = useState<DoctorType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve, _) => {
      setTimeout(resolve, 5000);
    });
    const doctor = doctorsData.find((item) => (item.id = doctorId));
    setData(doctor ? doctor : null);
    // setData([]);
    setLoading(false);
    return () => console.log("clean up");
  }, []);

  const isToday = (dateStr: string) => {
    let momentDate = moment(dateStr).format("LLLL").split(",");
    let dayName = momentDate[0];
    let monthStrSplit = momentDate[1];

    return dayName + " " + monthStrSplit + ", " + time;
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      {" "}
      {data === null ? (
        <span className="mt-20 flex flex-row items-center justify-center text-md font-semibold">
          No doctor availability data found, please try again later
        </span>
      ) : (
        <div className="space-y-4 w-2/4">
          <div
            className={`bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
          >
            <div className="p-5">
              <div className="mt-2 ml-2">
                <div className="flex flex-row items-center gap-2">
                  <Avatar
                    size={"lg"}
                    color="blue"
                    radius={"lg"}
                    src={data.avatar}
                  />
                  <div className="">
                    <p className="text-md font-bold">{data.name}</p>
                    <p className="text-sm font-semibold">{data.title}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3 pl-7">
                <div className="flex flex-row items-center">
                  <div className="w-[150px] flex flex-row items-center gap-2">
                    <SlCalender fontSize="14px" />
                    <span className="font-semibold text-[12px] text-gray-500">
                      Date:
                    </span>{" "}
                  </div>
                  <div className="text-sm text-gray-600">{isToday(date)}</div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="w-[150px] flex flex-row items-center gap-2">
                    <AiOutlineClockCircle fontSize="14px" />
                    <span className="font-semibold text-[12px] text-gray-500">
                      Duration:
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">30 Minutes</div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="w-[150px] flex flex-row items-center gap-2">
                    <BsBell fontSize="14px" />
                    <span className="font-semibold text-[12px] text-gray-500">
                      Reminders:
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <p className="text-sm text-gray-600">pelumi.al@gmail.com</p>
                    <button className="text-md text-green-500 font-bold">
                      Change
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <div className="w-[150px] flex flex-row items-center gap-2">
                    <AiOutlineCreditCard fontSize="14px" />
                    <span className="font-semibold text-[12px] text-gray-500">
                      Payment Details:
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <p className="text-sm text-gray-600 font-semibold">
                      Mastercard ****6427 - Exp 02/25
                    </p>
                    <button className="text-md text-green-500 font-bold">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Checkbox
              size="sm"
              color="green"
              label={
                <div>
                  <span className="text-[12px]">
                    I certify that I have read the{" "}
                    <span className="text-green-400">terms</span> of Temple
                  </span>
                </div>
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className=""></div>
            <button className="p-2 px-3 rounded-2xl bg-green-800 text-[11px] font-semibold text-gray-200">
              Schedule Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
