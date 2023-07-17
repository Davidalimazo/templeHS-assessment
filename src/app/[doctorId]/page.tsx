"use client";

import { FC } from "react";
import PageContainer from "../components/PageContainer";
import Sidebar from "../components/Sidebar";
import AppointmentCard from "../components/AppointmentCard";

interface Props {
  params: { doctorId: number };
  searchParams: { date: string; time: string; index: number };
}

const Details: FC<Props> = ({ params, searchParams }) => {
  return (
    <div className="">
      <PageContainer
        main={
          <AppointmentCard
            index={searchParams.index}
            time={searchParams.time}
            date={searchParams.date}
            doctorId={params.doctorId}
          />
        }
        sidebar={<Sidebar component="Confirm your appointment details" />}
      ></PageContainer>
    </div>
  );
};

export default Details;
