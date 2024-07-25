import { useQuery } from "@tanstack/react-query";
import { fetchRooms } from "../../services/roomService";
import RoomItem from "../roomItem";
import Modal from "../modal";
import AddRoomForm from "../addRoomForm";

type ConversationProps = {
  modalOpen: boolean;
  toggleModal: () => void;
};

export default function Conversations({
  modalOpen,
  toggleModal,
}: ConversationProps) {
  const { data } = useQuery({ queryKey: ["rooms"], queryFn: fetchRooms });

  return (
    <div className="w-[17%] md:w-[30%] h-full p-2 overflow-y-scroll mt-24 lg:mt-0">
      {data?.rooms.map((room: any) => {
        return <RoomItem key={room._id} room={room} />;
      })}

      <Modal toggleModal={toggleModal} open={modalOpen}>
        <AddRoomForm toggleModal={toggleModal} />
      </Modal>
    </div>
  );
}
