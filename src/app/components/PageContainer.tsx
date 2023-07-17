import { FC } from "react";

interface PageContainerProps {
  main: React.ReactNode;
  sidebar: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ main, sidebar }) => {
  return (
    <div className="py-5 px-10 pt:2 md:pt-10 flex flex-col lg:flex-row gap-10 sm:gap-20 w-full">
      {sidebar}
      {main}
    </div>
  );
};

export default PageContainer;
