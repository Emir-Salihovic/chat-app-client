export default function Conversations() {
  return (
    <div className="w-[17%] md:w-[30%] h-full p-2">
      <div className="bg-boxGrey flex justify-center md:justify-start gap-x-2 p-2 rounded-lg">
        <div className="h-[45px] w-[45px] bg-black text-white rounded-md flex items-center justify-center">
          <p className="text-lg">DC</p>
        </div>

        <div className="hidden md:flex flex-col">
          <h6 className="font-semibold">Design Chat</h6>
          <p className="text-messageText font-medium text-xs">
            Jessie rollins sent...
          </p>
        </div>
      </div>
      <div className="bg-boxGrey flex justify-center md:justify-start gap-x-2 p-2 rounded-lg my-2.5">
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
      </div>
    </div>
  );
}
