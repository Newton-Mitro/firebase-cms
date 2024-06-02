import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
