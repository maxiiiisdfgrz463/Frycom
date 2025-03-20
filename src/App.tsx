import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AppRoutes from "./routes";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
