import { FC } from 'react'
import Sidebar from './Sidebar'
import DoctorsList from './DoctorsList'

interface PageContainerProps {
  
}

const PageContainer: FC<PageContainerProps> = ({}) => {
  return <div className='py-5 px-10 flex flex-row gap-10 sm:gap-20'>
    <Sidebar/>
    <DoctorsList/>
  </div>
}

export default PageContainer