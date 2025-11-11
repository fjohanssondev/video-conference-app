import { useQuery } from "@tanstack/react-query";

function useRoomToken(roomName: string, identity: string) {
  return useQuery({
    queryKey: ["roomToken", roomName, identity],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName, identity }),
      });
      const data = await response.json();
      return data.token;
    },
  });
}

export { useRoomToken };
