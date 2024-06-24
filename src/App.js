import AppLayout from "./components/AppLayout";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import Homepage from "./components/Homepage.js";
import { Toaster } from "react-hot-toast";
function App() {
  // console.log('render app..')
  return (
    <AppLayout>
      <Toaster
        position="top-right"
        gutter={8}
      />
      <Routes>
        <Route path="/:projectId" element={<Task />} />
        <Route path="/" element={<Homepage/>} />
      </Routes>
    </AppLayout>
  );
}

export default App;
