import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Logo from "../../assets/chat.png";
import { AllChatsIcon, LogoutIcon } from "../../icons";
import { logout } from "../../services/authService";
import useAuthStore, { AuthState } from "../../store/authStore";

function Sidebar() {
  const navigate = useNavigate();
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
    },
    onError(err: any) {
      console.error("err while loging out", err);
    },
  });

  async function handleLogout() {
    await logoutMutation.mutateAsync();
  }

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
