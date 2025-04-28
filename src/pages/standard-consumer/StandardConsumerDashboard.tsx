import Overview from "@/components/standard-consumer/Overview";
import { basicConsumerStore } from "@/store/ConsumerStore";

const StandardConsumerDashboard = () => {
  const { user } = basicConsumerStore();

  console.log(user, "user from zustand store in dashboard");
  return (
    <div className="">
      <Overview />
    </div>
  );
};

export default StandardConsumerDashboard;
