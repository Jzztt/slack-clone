import { useAuth } from "@clerk/clerk-react";
import * as Sentry from "@sentry/react";
import { Navigate, Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import CallPage from "./pages/CallPage";
import Home from "./pages/Home";
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <>
      <SentryRoutes>
        <Route
          path="/"
          element={isSignedIn ? <Home /> : <Navigate to="/auth" replace />}
        ></Route>
        <Route
          path="/auth"
          element={!isSignedIn ? <Auth /> : <Navigate to="/" replace />}
        ></Route>

        <Route
          path="/call/:id"
          element={isSignedIn ? <CallPage /> : <Navigate to="/auth" replace />}
        ></Route>

        <Route
          path="*"
          element={
            isSignedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        ></Route>
      </SentryRoutes>
    </>
  );
};

export default App;
