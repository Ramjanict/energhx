import { useAdminStore } from "@/store/AdminStore/AdminStore";

interface UserProfileData {
  label: string;
  value: string | number | null;
}
const UserProfileData: React.FC<UserProfileData> = ({ label, value }) => {
  const { DevUser } = useAdminStore();
  return (
    DevUser && (
      <div className="space-y-2">
        <div className="">{label}</div>
        <div className="p-3 bg-gray-50 border">
          <p className="text-gray-900">{value}</p>
        </div>
      </div>
    )
  );
};

export default UserProfileData;
