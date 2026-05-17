import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import html2canvas from "html2canvas";

import { AppLayout } from "@/components/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Download,
  FileText,
  BarChart3,
} from "lucide-react";

/* =========================
   Reports Page
========================= */

const Reports = () => {

  /* =========================
     Uploaded Projects
  ========================= */

  const uploadedProjects = JSON.parse(
    localStorage.getItem("projects") || "[]"
  );

  /* =========================
     Analytics Counts
  ========================= */

  const completedProjects =
    uploadedProjects.filter((p: any) =>
      p.status?.toLowerCase().includes("completed")
    ).length;

  const ongoingProjects =
    uploadedProjects.filter((p: any) =>
      p.status?.toLowerCase().includes("ongoing")
    ).length;

  const pendingProjects =
    uploadedProjects.filter((p: any) =>
      p.status?.toLowerCase().includes("pending")
    ).length;

  /* =========================
     Generate Dashboard Report
  ========================= */

  const generateDashboardReport = () => {

    const doc = new jsPDF();

    /* Title */
    doc.setFontSize(22);

    doc.text(
      "Project Dashboard Report",
      20,
      20
    );

    /* Summary */
    doc.setFontSize(14);

    doc.text(
      `Total Projects: ${uploadedProjects.length}`,
      20,
      40
    );

    doc.text(
      `Completed Projects: ${completedProjects}`,
      20,
      50
    );

    doc.text(
      `Ongoing Projects: ${ongoingProjects}`,
      20,
      60
    );

    doc.text(
      `Pending Projects: ${pendingProjects}`,
      20,
      70
    );

    /* Table */
    autoTable(doc, {

      startY: 90,

      head: [[
        "Project",
        "Owner",
        "Category",
        "Status",
      ]],

      body: uploadedProjects.map(
        (p: any) => [

          p.project_name,

          p.project_owner || "-",

          p.category || "-",

          p.status,
        ]
      ),
    });

    /* Save */
    doc.save("dashboard-report.pdf");
  };

  /* =========================
     Generate Project Report
  ========================= */

  const generateProjectReport = (
    project: any
  ) => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "Project Details Report",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `Project Name: ${project.project_name}`,
      20,
      50
    );

    doc.text(
      `Owner: ${project.project_owner || "-"}`,
      20,
      65
    );

    doc.text(
      `Category: ${project.category || "-"}`,
      20,
      80
    );

    doc.text(
      `Status: ${project.status}`,
      20,
      95
    );

    doc.text(
      `Start Date: ${project.start_date || "-"}`,
      20,
      110
    );

    doc.text(
      `End Date: ${project.end_date || "-"}`,
      20,
      125
    );

    doc.save(
      `${project.project_name}-report.pdf`
    );
  };

  return (

    <AppLayout>

      <div className="space-y-6 animate-fade-in">

        {/* Header */}
        <div>

          <h1 className="text-3xl font-bold">
            Reports
          </h1>

          <p className="text-muted-foreground mt-1">
            Generate dashboard and project reports
          </p>

        </div>

        {/* Dashboard Report */}
        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <BarChart3 className="h-5 w-5" />

              Dashboard Report

            </CardTitle>

          </CardHeader>

          <CardContent>

            <Button
              onClick={generateDashboardReport}
              className="flex gap-2"
            >

              <Download className="h-4 w-4" />

              Download Dashboard Report

            </Button>

          </CardContent>

        </Card>

        {/* Project Reports */}
        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <FileText className="h-5 w-5" />

              Project Reports

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            {uploadedProjects.map(
              (project: any, index: number) => (

                <div
                  key={index}
                  className="
                    flex items-center
                    justify-between
                    border rounded-lg
                    p-4
                  "
                >

                  <div>

                    <h2 className="font-semibold">

                      {project.project_name}

                    </h2>

                    <p className="text-sm text-muted-foreground">

                      {project.status}

                    </p>

                  </div>

                  <Button
                    onClick={() =>
                      generateProjectReport(project)
                    }
                  >

                    Download PDF

                  </Button>

                </div>

              )
            )}

          </CardContent>

        </Card>

      </div>

    </AppLayout>

  );
};

export default Reports;