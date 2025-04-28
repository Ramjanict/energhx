import RequestList from "@/components/Appointment/RequestList";
import ViewDetails from "@/components/Appointment/ViewDetails";
import { useState } from "react";

function DeveloperCertifiedAppointmentRequest() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleViewRequest = (order: string) => {
    setSelectedItem(order);
  };

  if (selectedItem) {
    return <ViewDetails />;
  }

  return <RequestList onViewRequest={handleViewRequest} />;
}

export default DeveloperCertifiedAppointmentRequest;
