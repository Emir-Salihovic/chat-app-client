import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Logo from "../../assets/chat.png";
import { useState } from "react";
import { addRoom } from "../../services/roomService";
import { socket } from "../../main";
import { useNavigate } from "react-router";
import useAuthStore, { AuthState } from "../../store/authStore";

type AddRoomFormProps = {
  toggleModal: () => void;
};

const AddRoomForm: React.FC<AddRoomFormProps> = ({ toggleModal }) => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState<string>("");

  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);

  const addRoomMutation = useMutation({
    mutationKey: ["add-room"],
    mutationFn: () => addRoom(roomName),

    onError(err) {
      console.error("There was a problem creating the room", err);
    },
    onSuccess: (data) => {
      const { room } = data;
      console.log("data after room added", data);
      toggleModal();
      toast.success("Room added!");

      socket.emit("createRoom");

      socket.emit("joinRoom", {
        userId: logedInUser?._id,
        roomId: room._id,
      });

      navigate(`/rooms/${room._id}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addRoomMutation.mutateAsync();
  };

  return (
    <>
      <div className="text-center mb-6">
        <div className="text-4xl mb-2 text-center">
          <img src={Logo} alt="Logo" className="h-12 inline-block" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            id="username"
            className="p-2 block w-full border rounded-md"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            placeholder="Please enter a room name..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-messageContainerSender text-white py-2 rounded-md hover:bg-purple-700 transition duration-300 disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddRoomForm;
