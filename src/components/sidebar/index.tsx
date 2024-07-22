import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Logo from "../../assets/chat.png";
import { AddRoomIcon, AllChatsIcon, LogoutIcon } from "../../icons";
import { logout } from "../../services/authService";
import useAuthStore, { AuthState } from "../../store/authStore";
import { socket } from "../../main";

type SidebarProps = {
  toggleModal: () => void;
};

function Sidebar({ toggleModal }: SidebarProps) {
  const navigate = useNavigate();
  const params = useParams();

  const logedInUser = useAuthStore((state: AuthState) => state.logedInUser);

  const setAuthenticated = useAuthStore(
    (state: AuthState) => state.setAuthenticated
  );
  const setLogedInUser = useAuthStore(
    (state: AuthState) => state.setLogedInUser
  );

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      setAuthenticated(false);
      setLogedInUser(null);

      navigate("/login");

      socket.emit("userLogout", {
        userId: logedInUser?._id,
        roomId: params?.roomId,
      });
    },
    onError(err: any) {
      console.error("err while loging out", err);
    },
  });

  async function handleLogout() {
    await logoutMutation.mutateAsync();

    socket.emit("userLogout", {
      userId: logedInUser?._id,
      roomId: params.roomId,
    });
  }

  return (
    <div className="h-full w-[6%] hidden lg:block px-4 mr-4">
      <div className="flex h-full flex-col items-center">
        <div className="h-10 w-10">
          <img src={Logo} alt="Logo" className="h-full" />
        </div>

        <div className="mt-8 h-full relative text-white">
          <div className="flex flex-col items-center gap-y-[3px] cursor-pointer">
            <AllChatsIcon />
            <p className="text-[10px] font-thin">Chats</p>
          </div>
          <div
            className="flex flex-col items-center gap-y-[3px] cursor-pointer mt-4"
            onClick={toggleModal}
          >
            <AddRoomIcon />
            <p className="text-[10px] font-thin">Add Room</p>
          </div>
          <div
            onClick={handleLogout}
            className="flex flex-col items-center gap-y-[3px] cursor-pointer absolute bottom-2"
          >
            <LogoutIcon />
            <button className="text-xs font-thin">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
