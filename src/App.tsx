import { Outlet } from "react-router-dom";

import Conversations from "./components/conversations";
import Sidebar from "./components/sidebar";
import { useState } from "react";

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen((prevState: boolean) => !prevState);
  };

  return (
    <main className="bg-container h-screen flex items-center p-0 lg:p-4">
      <Sidebar toggleModal={toggleModal} />

      <div className="w-full lg:w-[94%] h-full bg-whitePrimary text-black">
        <div className="flex items-center gap-x-4 h-full overflow-hidden">
          <Conversations modalOpen={modalOpen} toggleModal={toggleModal} />
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default App;
