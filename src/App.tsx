import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

/* =========================
   Pages
========================= */

import Auth from "./pages/Auth";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Managers from "./pages/Managers";
import Employees from "./pages/Employees";
import UploadData from "./pages/UploadData";
import ActivityLog from "./pages/ActivityLog";

import AddProject from "./pages/AddProject";
import BusinessAnalytics from "./pages/BusinessAnalytics";
import CompletedProjects from "./pages/CompletedProjects";
import DeletedProjects from "./pages/DeletedProjects";

/* Future Modules */
import NotFound from "./pages/NotFound";
import { Calendar } from "lucide-react";
import CalendarView from "./pages/CalendarView";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";

/* =========================
   Query Client
========================= */

const queryClient = new QueryClient();

/* =========================
   Protected Route
========================= */

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {

  const { user, role } = useAuth();

  /* Not Logged In */
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  /* Role Restriction */
  if (
    allowedRoles &&
    role &&
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

/* =========================
   Auth Route
========================= */

const AuthRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

/* =========================
   Main App
========================= */

const App = () => (

  <QueryClientProvider client={queryClient}>

    <TooltipProvider>

      <Toaster />

      <Sonner />

      <BrowserRouter>

        <AuthProvider>

          <Routes>

            {/* =========================
                Default Route
            ========================= */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            {/* =========================
                Auth
            ========================= */}
            <Route
              path="/auth"
              element={
                <AuthRoute>
                  <Auth />
                </AuthRoute>
              }
            />

            {/* =========================
                Dashboard
            ========================= */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* =========================
                Projects
            ========================= */}
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />

            {/* =========================
                Add Project
            ========================= */}
            <Route
              path="/add-project"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AddProject />
                </ProtectedRoute>
              }
            />

            {/* =========================
                Managers
            ========================= */}
            <Route
              path="/managers"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Managers />
                </ProtectedRoute>
              }
            />

            {/* =========================
                Employees
            ========================= */}
            <Route
              path="/employees"
              element={
                <ProtectedRoute allowedRoles={["admin", "manager"]}>
                  <Employees />
                </ProtectedRoute>
              }
            />

            {/* =========================
                Upload
            ========================= */}
            <Route
              path="/upload"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UploadData />
                </ProtectedRoute>
              }
            />

            {/* =========================
                Activity Log
            ========================= */}
            <Route
              path="/activity"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ActivityLog />
                </ProtectedRoute>
              }
            />

            {/* =========================
                Future Modules
            ========================= */}
            <Route
  path="/user-management"
  element={
    <ProtectedRoute allowedRoles={["superadmin"]}>
      <UserManagement />
    </ProtectedRoute>
  }
/>
            {/* Completed Projects */}
            <Route
  path="/completed-projects"
  element={
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <CompletedProjects />
    </ProtectedRoute>
  }
/>

            {/* Deleted Projects */}
            <Route
              path="/deleted-projects"
              element={
                <ProtectedRoute allowedRoles={["admin" , "manager"]}>
                  <DeletedProjects/>
                </ProtectedRoute>
              }
            />

            {/* Calendar */}
            <Route
              path="/calendar"
              element={
                <ProtectedRoute allowedRoles={["admin" , "manager"]}>
                  <CalendarView/>
                </ProtectedRoute>
              }
            />

            {/* Reports */}
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={["admin", "manager"]}>
                  <Reports/>
                </ProtectedRoute>
              }
            />

            <Route
  path="/analytics"
  element={
    <ProtectedRoute allowedRoles={["admin", "manager"]}>
      <BusinessAnalytics />
    </ProtectedRoute>
  }
/>

            {/* =========================
                404
            ========================= */}
            <Route
              path="*"
              element={<NotFound />}
            />
            

          </Routes>

        </AuthProvider>

      </BrowserRouter>

    </TooltipProvider>

  </QueryClientProvider>
);

export default App;