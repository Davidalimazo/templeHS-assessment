import DoctorsList from "./components/DoctorsList";
import PageContainer from "./components/PageContainer";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="">
      <PageContainer
        main={<DoctorsList />}
        sidebar={
          <Sidebar
            isHome
            component={<span>Select your doctor and appointment time</span>}
          />
        }
      />
    </main>
  );
}
