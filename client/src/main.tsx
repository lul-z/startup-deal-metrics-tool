import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Home } from "./pages/Home";

import { Navbar } from "./components/Navbar";

function Router() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-6">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/due-diligence">Due Diligence (Coming Soon)</Route>
          <Route path="/termsheet">Termsheet Checker (Coming Soon)</Route>
          <Route path="/valuation">Valuation Tools (Coming Soon)</Route>
          <Route>404 Page Not Found</Route>
        </Switch>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
