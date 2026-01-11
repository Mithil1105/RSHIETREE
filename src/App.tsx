import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import KnowRashi from "./pages/KnowRashi";
import FindRashi from "./pages/FindRashi";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import NurseryRedirect from "./pages/NurseryRedirect";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/know-rashi" element={<KnowRashi />} />
              <Route path="/find-rashi" element={<FindRashi />} />
              <Route path="/result" element={<Result />} />
              <Route path="/nursery-redirect" element={<NurseryRedirect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
