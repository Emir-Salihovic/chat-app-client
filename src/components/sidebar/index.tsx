import Logo from "../../assets/chat.png";
import { AllChatsIcon, LogoutIcon } from "../../icons";

function Sidebar() {
  return (
    <div className="h-full w-[6%] hidden lg:block px-4 mr-4">
      <div className="flex h-full flex-col items-center">
        <div className="h-8 w-8">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>

        <div className="mt-8 h-full relative text-white">
          <div className="flex flex-col items-center gap-y-[3px] cursor-pointer">
            <AllChatsIcon />
            <p className="text-xs font-thin">Chats</p>
          </div>
          <div className="flex flex-col items-center gap-y-[3px] cursor-pointer absolute bottom-2">
            <LogoutIcon />
            <p className="text-xs font-thin">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
