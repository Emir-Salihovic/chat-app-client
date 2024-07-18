import Sidebar from "./sidebar";

function App() {
  return (
    <main className="bg-container h-screen flex items-center p-4">
      <Sidebar />

      <div className="w-full lg:w-[94%] border-2 border-blue-500 h-full bg-whitePrimary text-black">
        <div className="flex items-center gap-x-4 border-2 border-green-500 h-full p-2">
          <div className="w-[20%] md:w-[30%] h-full border-2 border-red-500">
            CONVERSATIONS
          </div>
          <div className="w-[80%] md:w-[70%] h-full border-2 border-purple-500">
            ACTIVE CONVERSATION
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
