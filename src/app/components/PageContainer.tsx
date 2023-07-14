import { FC } from 'react'


interface PageContainerProps {
  children:React.ReactNode
  sidebar:React.ReactNode
}

const PageContainer: FC<PageContainerProps> = ({children, sidebar}) => {
  return <div className='py-5 px-10 flex flex-row gap-10 sm:gap-20'>
    {sidebar}
    {children}
  </div>
}

export default PageContainer