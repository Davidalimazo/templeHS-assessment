"use client";

import { FC } from "react";
import PageContainer from "../components/PageContainer";
import Sidebar from "../components/Sidebar";
import AppointmentCard from "../components/AppointmentCard";

interface Props {
  params: { doctorId: number };
  searchParams: { date: string; time: string };
}

const Details: FC<Props> = ({ params, searchParams }) => {
  return (
    <div className="">
      <PageContainer
        children={
          <AppointmentCard
            time={searchParams.time}
            date={searchParams.date}
            doctorId={params.doctorId}
          />
        }
        sidebar={<Sidebar children={"Confirm your appointment details"} />}
      />
    </div>
  );
};

export default Details;
