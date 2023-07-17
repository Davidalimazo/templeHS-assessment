"use client";

import { FC, useEffect, useState } from "react";
import avatar from "@/assets/images/avatar.png";
import { Avatar, Checkbox } from "@mantine/core";
import { DoctorTypeApi } from "@/types/doctor";
import moment from "moment";
import Loader from "./Loader";
import { SlCalender } from "react-icons/sl";
import { AiOutlineClockCircle, AiOutlineCreditCard } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import toast from "react-hot-toast";
import { apiRoutes, axiosInstance } from "../utils/api_config";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import ChangeModal, { PaymentValues } from "./ChangeModal";

interface Props {
  doctorId: number;
  date: string;
  time: string;
  index: number;
}

const AppointmentCard: FC<Props> = ({ doctorId, date, time, index }) => {
  const [data, setData] = useState<DoctorTypeApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [check, setCheck] = useState(false);
  const router = useRouter();
  const [emailOpened, { open: emailOpen, close: emailClose }] =
    useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState("pelumi.al@gmail.com");
  const [payment, setPayment] = useState<PaymentValues>({
    cardNumber: "5699345278652132",
    cardType: "Mastercard",
    month: "2",
    year: "25",
  });

  useEffect(() => {
    const getData = async () =>
      await axiosInstance
        .get(apiRoutes.doctors.getDoctorById(doctorId))
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    getData();
    return () => console.log("clean up");
  }, [doctorId]);

  const isToday = (dateStr: string) => {
    let momentDate = moment(dateStr).format("LLLL").split(",");
    let dayName = momentDate[0];
    let monthStrSplit = momentDate[1];

    return dayName + " " + monthStrSplit + ", " + time;
  };

  const filtered = (str: string, index: number) => {
    data &&
      data.availableSlots.map((slots, id) => {
        if (id == index) {
          slots.isBooked = true;
        }
      });
    setData(data);
  };

  const hideCardNumber = (card: string) => {
    const cardNum = card.slice(8);
    const left = cardNum.slice(0, 4).replace(/\w/gi, "*");
    const right = cardNum.slice(4);
    return left + right;
  };

  const notify = async (doctorId: number, slotIndex: number) => {
    setLoading(true);
    await axiosInstance
      .post(apiRoutes.appointments.createAppointment, {
        date: date,
        duration: isToday(date),
        reminder_email: email,
        payment_details: `${
          payment.cardType +
          " " +
          payment.cardNumber +
          " - " +
          "Exp " +
          payment.month +
          "/" +
          payment.year
        }`,
      })
      .then((res) => {
        setLoading(false);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(
          "An error occured while booking your appointment, please try again later"
        );
      });

    if (isSuccess) {
      await axiosInstance
        .patch(apiRoutes.doctors.book, {
          id: doctorId,
          slotIndex: slotIndex,
        })
        .then((res) => {
          setLoading(false);
          toast.success("You have successfully booked an appointment");
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(
            "An error occured while booking your appointment, please try again later"
          );
        });
    }
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
        <div className="space-y-4 w-full lg:w-3/4">
          <div
            className={`bg-white border border-gray-200 rounded-lg shadow-lg  w-full lg:w-3/4`}
          >
            <div className="p-3 md:p-5">
              <div className="mt-2 ml-2">
                <div className="flex flex-row items-center gap-2">
                  <Avatar
                    size={"lg"}
                    color="blue"
                    radius={"lg"}
                    src={avatar.src}
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
                    <p className="text-sm text-gray-600">{email}</p>
                    <button
                      className="text-md text-green-500 font-bold cursor-pointer"
                      onClick={emailOpen}
                    >
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
                      {` ${payment.cardType} ${hideCardNumber(
                        payment.cardNumber
                      )} - Exp ${payment.month}/${payment.year} `}
                    </p>
                    <button
                      className="text-md text-green-500 font-bold cursor-pointer"
                      onClick={open}
                    >
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
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
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
          <div className="flex flex-row items-center justify-between w-full lg:w-3/4">
            <div className=""></div>
            <button
              disabled={!check}
              onClick={() => notify(doctorId, index)}
              className={`p-2 px-3 rounded-2xl ${
                check
                  ? "bg-green-800 text-gray-100"
                  : "bg-gray-300  text-gray-400"
              }  text-[11px] font-semibold cursor-pointer`}
            >
              Schedule Appointment
            </button>
          </div>
        </div>
      )}
      <ChangeModal
        open={open}
        opened={opened}
        close={close}
        setEmail={setEmail}
        setpayment={setPayment}
      />
      <ChangeModal
        open={emailOpen}
        opened={emailOpened}
        close={emailClose}
        isChangeEmail
        setpayment={setPayment}
        setEmail={setEmail}
      />
    </>
  );
};

export default AppointmentCard;
