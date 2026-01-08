import DashboardHeader from "../components/layout/dashboardLayout/DashboardHeader";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="container">
      <DashboardHeader />
      <Button>Click here</Button>
    </div>
  );
}
