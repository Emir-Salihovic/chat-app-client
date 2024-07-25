import { Outlet } from "react-router-dom";

import Conversations from "./components/conversations";
import Sidebar from "./components/sidebar";
import { useState } from "react";

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen((prevState: boolean) => !prevState);
    setDrawerOpen(false);
  };

  const handleDrawerClose = () => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  return (
    <main className="bg-container h-[100dvh] flex items-center p-0 lg:p-4">
      <Sidebar
        toggleModal={toggleModal}
        isMobile={drawerOpen}
        setIsMobile={setDrawerOpen}
      />

      <div
        className="w-full lg:w-[94%] h-full bg-whitePrimary text-black"
        onClick={handleDrawerClose}
      >
        <div className="flex items-center gap-x-4 h-full overflow-hidden">
          <Conversations modalOpen={modalOpen} toggleModal={toggleModal} />
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default App;
