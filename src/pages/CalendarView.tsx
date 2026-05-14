import { useState } from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import { AppLayout } from "@/components/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CalendarDays,
  User,
  Clock,
} from "lucide-react";

/* =========================
   Calendar View
========================= */

const CalendarView = () => {

  /* =========================
     Selected Date
  ========================= */

  const [date, setDate] = useState<Date>(
    new Date()
  );

  /* =========================
     Uploaded Excel Data
  ========================= */

  const uploadedProjects = JSON.parse(
    localStorage.getItem("projects") || "[]"
  );

  /* =========================
     Format Date
  ========================= */

  const selectedDate =
    date.toISOString().split("T")[0];

  /* =========================
     Filter Projects
  ========================= */

  const filteredProjects =
    uploadedProjects.filter((project: any) => {

      if (!project.end_date) return false;

      return (
        project.end_date.includes(selectedDate)
      );

    });

  /* =========================
     Status Colors
  ========================= */

  const getStatusColor = (status: string) => {

    const lower =
      status?.toLowerCase() || "";

    if (lower.includes("completed")) {
      return "text-green-600";
    }

    if (lower.includes("ongoing")) {
      return "text-blue-600";
    }

    if (lower.includes("pending")) {
      return "text-yellow-600";
    }

    return "text-red-500";
  };

  return (

    <AppLayout>

      <div className="space-y-6 animate-fade-in">

        {/* =========================
            Header
        ========================= */}

        <div>

          <h1 className="text-3xl font-bold">
            Project Calendar
          </h1>

          <p className="text-muted-foreground mt-1">
            Track project timelines and team progress
          </p>

        </div>

        {/* =========================
            Main Grid
        ========================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* =========================
              Calendar Section
          ========================= */}

          <Card className="lg:col-span-1">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <CalendarDays className="h-5 w-5" />

                Calendar

              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="flex justify-center">

                <Calendar
                  onChange={(value) =>
                    setDate(value as Date)
                  }
                  value={date}
                  className="
                    border-0
                    rounded-xl
                    p-2
                    w-full
                  "
                />

              </div>

            </CardContent>

          </Card>

          {/* =========================
              Project Timeline
          ========================= */}

          <Card className="lg:col-span-2">

            <CardHeader>

              <CardTitle>
                Projects Due On {selectedDate}
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              {/* Empty State */}
              {filteredProjects.length === 0 && (

                <div className="text-center py-10">

                  <p className="text-muted-foreground">
                    No projects scheduled
                  </p>

                </div>

              )}

              {/* Projects */}
              {filteredProjects.map(
                (project: any, index: number) => (

                  <div
                    key={index}
                    className="
                      border rounded-xl p-5
                      hover:shadow-md
                      transition-all
                      bg-background
                    "
                  >

                    {/* Top */}
                    <div className="flex items-center justify-between">

                      <h2 className="text-lg font-semibold">

                        {project.project_name}

                      </h2>

                      <span
                        className={`
                          font-medium
                          ${getStatusColor(project.status)}
                        `}
                      >

                        {project.status}

                      </span>

                    </div>

                    {/* Details */}
                    <div className="mt-4 space-y-3">

                      {/* Owner */}
                      <div className="flex items-center gap-2 text-sm">

                        <User className="h-4 w-4 text-muted-foreground" />

                        <span>

                          {project.project_owner || "Unknown"}

                        </span>

                      </div>

                      {/* Dates */}
                      <div className="flex items-center gap-2 text-sm">

                        <Clock className="h-4 w-4 text-muted-foreground" />

                        <span>

                          {project.start_date}
                          {" → "}
                          {project.end_date}

                        </span>

                      </div>

                      {/* Category */}
                      <div className="text-sm text-muted-foreground">

                        Category:
                        {" "}
                        <span className="font-medium text-foreground">

                          {project.category || "NA"}

                        </span>

                      </div>

                    </div>

                  </div>

                )
              )}

            </CardContent>

          </Card>

        </div>

      </div>

    </AppLayout>

  );
};

export default CalendarView;