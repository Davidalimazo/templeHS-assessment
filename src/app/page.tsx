import DoctorsList from "./components/DoctorsList";
import Heading from "./components/Heading";
import PageContainer from "./components/PageContainer";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="w-screen">
      <PageContainer
        main={<DoctorsList />}
        sidebar={
          <Sidebar isHome component="Select your doctor and appointment time" />
        }
      />
    </main>
  );
}
