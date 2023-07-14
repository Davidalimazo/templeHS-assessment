"use client";

import { FC, useEffect, useState } from 'react'
import { Input, Select, Skeleton  } from '@mantine/core'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useWindowWidth from '@/hook/useWindowWidth';
import DoctorCard from './DoctorCard';
import { DoctorType } from '@/types/doctor';
import Loader from './Loader';
import { doctorsData } from '@/assets/data';



interface DoctorsListProps {
  
}

const DoctorsList: FC<DoctorsListProps> = ({}) => {

    const [loading, setLoading] = useState(true);
    const [timeplaceholder, settimeplaceholder] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
     const [experience, setExperience] = useState<string | null>(null);
     const [startTime, setStartTime] = useState<string>("13:34");
     const width = useWindowWidth();
     const [data, setData] = useState<DoctorType[]>([]);

     useEffect(()=>{
       new Promise((resolve, rejects)=>{
            setTimeout(resolve, 5000)
        });
        setData(doctorsData);
         // setData([]);
        setLoading(false);
        return ()=>console.log("clean up");
     },[])


     const onChangeTime=(value:any)=>{
        setStartTime(value.target.value);
     }

    const handleDateChange = (date:any) => {
        setSelectedDate(date);
        const filteredData = data.filter(item => {
            return item.availability.filter(i=>i.date === selectedDate);
            
          });
        console.log(filteredData)
      };


  return <div className=''>
    <div className="flex flex-row items-center gap-3">
        <div className="">
            <div className="font-semibold">Date</div>
            <div className="border border-[#9E9E9E] rounded-sm p-2">
                <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText='select date'
                dateFormat="yyyy/MM/dd"
            />
            </div>
        </div>
        <div className="">
            <div className="font-semibold">Time</div>
            <div className={`${timeplaceholder ? "" : "border border-[#9E9E9E]"} rounded-sm p-2 h-[41px] w-[200px] flex flex-row gap-2 items-center`} onClick={()=>settimeplaceholder(true)}>
              {timeplaceholder ? 
              <>
              <Input type='time' w={200} size='md' value={startTime} onChange={onChangeTime}/> 
              </> : <span className='text-[#9E9E9E]'>select time range</span>} 
            </div>
        </div>
        <div className="">
            <div className="font-semibold">Expertise</div>
            <div className="">
                 <Select
                    size='md'
                    value={experience}
                    onChange={setExperience}
                    placeholder="Select expertise"
                    data={[
                        { value: 'Medical Doctor', label: 'Medical Doctor' },
                        { value: 'Dentist', label: 'Dentist' },
                        { value: 'Care Team Clinician Supervisor', label: 'Care Team Clinician Supervisor' },
                    ]}
                    />
            </div>
        </div>
    </div>
    {
        loading ? <Loader/> :<> {data.length === 0 ? <span className='mt-20 flex flex-row items-center justify-center text-md font-semibold'>No doctor availability data found, please try again later</span>:  <div className="flex flex-col gap-4">
            {
                data.map((doctor, index)=>(
                    <DoctorCard availability={doctor.availability} acceptVirtualVisitOnly={doctor.acceptVirtualVisitOnly} avatar={doctor.avatar} description={doctor.description} initials={doctor.initials} name={doctor.name} title={doctor.title} key={index}/>
                ))
            }
    </div> }</>
    }
  </div>
}

export default DoctorsList