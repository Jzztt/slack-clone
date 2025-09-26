import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <header>
      <SignedIn>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="*" element={<Navigate to="/auth" replace />}></Route>
        </Routes>
      </SignedOut>
    </header>
  );
};

export default App;
