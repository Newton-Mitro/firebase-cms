import "react-photo-view/dist/react-photo-view.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

function App() {
  return (
    <div className="font-sans-serif">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
