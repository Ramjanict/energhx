import ProgramChart from "../components/chart/ProgramChart";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ProgramChart />
      <ProgramChart />
      <ProgramChart />
      <ProgramChart />
      <ProgramChart />
    </div>
  );
};

export default Home;
