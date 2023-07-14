"use client";

import { FC, useEffect, useState } from 'react'
import { Input, Select  } from '@mantine/core'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DoctorCard from './DoctorCard';
import { DoctorType } from '@/types/doctor';
import Loader from './Loader';
import { doctorsData } from '@/assets/data';
import { useDebouncedState } from '@mantine/hooks';
import moment from "moment";
import { dateFormater } from '../utils/time_converter';



interface DoctorsListProps {
  
}

const DoctorsList: FC<DoctorsListProps> = ({}) => {

    const [loading, setLoading] = useState(true);
    const [timeplaceholder, settimeplaceholder] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
     const [experience, setExperience] = useState<string | null>(null);
     const [startTime, setStartTime] = useDebouncedState<string>("13:34", 200);
     const [data, setData] = useState<DoctorType[]>([]);

     useEffect(()=>{
       new Promise((resolve, _)=>{
            setTimeout(resolve, 5000)
        });
        setData(doctorsData);
         // setData([]);
        setLoading(false);
        return ()=>console.log("clean up");
     },[])


     const onChangeTime=(value:any)=>{
        setStartTime(value.target.value);

        const filtered =(str:string)=>{
            let data:DoctorType[]=[]
             doctorsData.map(item=>{
               item.availableSlots.map(e=>{
                if(e.time == str){
                  data.push(item)
                }
               })
            });
            return data;
          }
          if(filtered(value.target.value)){
            setData(filtered(value.target.value))
          }
     }
     const onChangeExperience=(value:any)=>{
        setExperience(value);
        if(value === "All"){
            setData(doctorsData)
        }else{
            const filtered = doctorsData.filter(item=>item.title ===value);
            setData(filtered)
        }
     }

    const handleDateChange = (date:any) => {
        setSelectedDate(date);

        const filtered =(str:string)=>{
            let data:DoctorType[]=[]
            doctorsData.map(item=>{
               item.availableSlots.map(e=>{
                if(e.date == str){
                  data.push(item)
                }
               })
            });
            return data;
          }
          if(filtered(dateFormater(date))){
            setData(filtered(dateFormater(date)))
          }
         
      };


  return <div className=''>
    <div className="flex flex-row items-center gap-3">
        <div className="">
            <div className="font-semibold">Date</div>
            <div className="border border-[#9E9E9E] rounded-md p-2">
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
            <div className={`${timeplaceholder ? "" : "border border-[#9E9E9E]"} rounded-md p-2 h-[41px] w-[200px] flex flex-row gap-2 items-center`} onClick={()=>settimeplaceholder(true)}>
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
                    onChange={onChangeExperience}
                    placeholder="Select expertise"
                    data={[
                        { value: 'All', label: 'All' },
                        { value: 'Medical Doctor', label: 'Medical Doctor' },
                        { value: 'Care Team Clinician Supervisor', label: 'Care Team Clinician Supervisor' },
                    ]}
                    />
            </div>
        </div>
    </div>
    {
        loading ? <Loader/> :<> {data.length === 0 ? <span className='mt-20 flex flex-row items-center justify-center text-md font-semibold'>No doctor availability data found, please try again later</span>:  <div className="flex flex-col gap-4">
            {
                data.map((doctor)=>(
                    <DoctorCard availableSlots={doctor.availableSlots} acceptVirtualVisitOnly={doctor.acceptVirtualVisitOnly} avatar={doctor.avatar} bio={doctor.bio} name={doctor.name} title={doctor.title} key={doctor.id} id={doctor.id}/>
                ))
            }
    </div> }</>
    }
  </div>
}

export default DoctorsList