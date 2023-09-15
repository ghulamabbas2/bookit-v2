import Home from "@/components/Home";
import Error from "./error";

export const metadata = {
  title: "HomePage - BookIT",
};

const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();

  try {
    const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error => ", error);
  }
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getRooms(searchParams);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
