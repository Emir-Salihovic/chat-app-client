import { socket } from "../../main";

export default function Conversations() {
  const userId = "669a5acd5a043e8b3a61e85e";
  const roomId = "669938ffc6986f5d723c2bff";

  const joinRoom = () => {
    socket.emit("joinRoom", { userId, roomId });
  };

  return (
    <div className="w-[17%] md:w-[30%] h-full p-2 overflow-y-scroll">
      <div className="bg-boxGrey flex justify-center items-center md:justify-between gap-x-2 p-2 rounded-lg">
        <div className="flex gap-x-2">
          <div className="h-[45px] w-[45px] bg-messageContainerSender text-white rounded-md flex items-center justify-center">
            <p className="text-lg">DC</p>
          </div>

          <div className="hidden md:flex flex-col">
            <h6 className="font-semibold">Design Chat</h6>
            <p className="text-black font-light text-xs">
              Jessie rollins sent...
            </p>
          </div>
        </div>

        <button
          onClick={joinRoom}
          className="bg-messageContainerSender text-white text-xs py-1 px-3 inline-block rounded-lg h-[30px]"
        >
          +
        </button>
      </div>

      {/* <div className="bg-boxGrey flex justify-center md:justify-start gap-x-2 p-2 rounded-lg my-2.5">
        <div className="h-[45px] w-[45px] bg-blue-500 text-white rounded-md flex items-center justify-center">
          <p className="text-lg">SC</p>
        </div>

        <div className="hidden md:flex flex-col">
          <h6 className="font-semibold">Sports Chat</h6>
          <p className="text-messageText font-medium text-xs">
            Jessie rollins sent...
          </p>
        </div>
      </div>
      <div className="bg-boxGrey flex justify-center md:justify-start gap-x-2 p-2 rounded-lg">
        <div className="h-[45px] w-[45px] bg-red-500 text-white rounded-md flex items-center justify-center">
          <p className="text-lg">CC</p>
        </div>

        <div className="hidden md:flex flex-col">
          <h6 className="font-semibold">Coding Chat</h6>
          <p className="text-messageText font-medium text-xs">
            Jessie rollins sent...
          </p>
        </div>
      </div> */}
    </div>
  );
}
