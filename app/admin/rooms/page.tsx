import Error from "@/app/error";
import Home from "@/components/Home";
import AllRooms from "@/components/admin/AllRooms";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "All Rooms - ADMIN",
};

const getRooms = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/admin/rooms`, {
    headers: authHeaders.headers,
  });
  return res.json();
};

export default async function AdminRoomsPage() {
  const data = await getRooms();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <AllRooms data={data} />;
}
