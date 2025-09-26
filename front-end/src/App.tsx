import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import * as Sentry from "@sentry/react";
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {

  return (
    <>
    <button onClick={() => {throw new Error("Error")}}> Throw Error</button>
      <SignedIn>
        <SentryRoutes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Navigate to="/" replace />}></Route>
        </SentryRoutes>
      </SignedIn>

      <SignedOut>
        <SentryRoutes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="*" element={<Navigate to="/auth" replace />}></Route>
        </SentryRoutes>
      </SignedOut>
    </>
  );
};

export default App;
