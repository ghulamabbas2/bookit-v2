import Home from "@/components/Home";

// export const dynamic = "force-dynamic";

const getRooms = async () => {
  const res = await fetch("http://localhost:3000/api/rooms", {
    next: {
      tags: ["Rooms"],
    },
  });
  return res.json();
};

export default async function HomePage() {
  const rooms = await getRooms();
  console.log("resPerPage => ", rooms.resPerPage);

  return <Home />;
}
