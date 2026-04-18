import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
import { ThemeProvider } from "@/components/ThemeProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Marketplace from "./pages/marketplace/Marketplace";
import NewListing from "./pages/marketplace/NewListing";
import ListingDetail from "./pages/marketplace/ListingDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/events/EventDetail";
import LinkedIn from "./pages/LinkedIn";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import EventAttendance from "./pages/admin/EventAttendance";
import NotFound from "./pages/NotFound";
import Leaderboard from "./pages/Leaderboard";

const queryClient = new QueryClient();

const SetupRequired = () => (
  <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center p-6">
    <div className="max-w-xl w-full bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Configuration Required</h1>
      <p className="text-slate-700">
        Supabase environment variables are missing. Create a <code>.env</code> file
        in the project root and restart the dev server.
      </p>
      <pre className="text-sm bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto">
{`VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key`}
      </pre>
      <p className="text-sm text-slate-600">
        You can copy the values from your Supabase project settings.
      </p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isSupabaseConfigured ? (
          <BrowserRouter>
            <AuthProvider>
              <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><AppLayout><Home /></AppLayout></ProtectedRoute>} />
              <Route path="/marketplace" element={<ProtectedRoute><AppLayout><Marketplace /></AppLayout></ProtectedRoute>} />
              <Route path="/marketplace/new" element={<ProtectedRoute><AppLayout><NewListing /></AppLayout></ProtectedRoute>} />
              <Route path="/marketplace/:id" element={<ProtectedRoute><AppLayout><ListingDetail /></AppLayout></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><AppLayout><Events /></AppLayout></ProtectedRoute>} />
              <Route path="/events/:id" element={<ProtectedRoute><AppLayout><EventDetail /></AppLayout></ProtectedRoute>} />
              <Route path="/linkedin" element={<ProtectedRoute><AppLayout><LinkedIn /></AppLayout></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute requireAdmin><AppLayout><Admin /></AppLayout></ProtectedRoute>} />
              <Route path="/admin/events/:eventId" element={<ProtectedRoute requireAdmin><AppLayout><EventAttendance /></AppLayout></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><AppLayout><Leaderboard /></AppLayout></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        ) : (
          <SetupRequired />
        )}
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;