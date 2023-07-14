import { FC } from 'react'
import {PiCaretLeft} from "react-icons/pi"

interface LandingPageProps {
  
}

const Sidebar: FC<LandingPageProps> = ({}) => {
  return <div>
    <div className="flex flex-row gap-2 items-center font-semibold">
      <PiCaretLeft fontSize="19px"/> <span>Go back</span>
    </div>
    <div className="mt-10 font-bold text-2xl w-[300px]">
      Select your doctor and appointment time
    </div>
  </div>
}

export default Sidebar