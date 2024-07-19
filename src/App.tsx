import ActiveConversation from "./components/activeConversation";
import Conversations from "./components/conversations";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <main className="bg-container h-screen flex items-center p-0 lg:p-4">
      <Sidebar />

      <div className="w-full lg:w-[94%] h-full bg-whitePrimary text-black">
        <div className="flex items-center gap-x-4 h-full overflow-hidden">
          <Conversations />
          <ActiveConversation />
        </div>
      </div>
    </main>
  );
}

export default App;
