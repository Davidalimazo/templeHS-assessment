import { FC } from "react";

interface PageContainerProps {
  main: React.ReactNode;
  sidebar: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ main, sidebar }) => {
  return (
    <div className="py-5 px-10 flex flex-row gap-10 sm:gap-20">
      {sidebar}
      {main}
    </div>
  );
};

export default PageContainer;
