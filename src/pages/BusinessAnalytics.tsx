import {
  useEffect,
  useState,
} from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { AppLayout } from "@/components/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PROJECT_API from "@/api/projectApi";

/* =========================
   Business Analytics
========================= */

const BusinessAnalytics = () => {

  /* =========================
     Live MongoDB Projects
  ========================= */

  const [projects, setProjects] =
    useState<any[]>([]);

  /* =========================
     Fetch Projects
  ========================= */

  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          const res =
            await PROJECT_API.get(
              "/"
            );

          setProjects(
            res.data
          );

        }

        catch (error) {

          console.log(error);

        }
      };

    fetchProjects();

  }, []);

  /* =========================
     Project Counts
  ========================= */

  const totalProjects =
    projects.length;

  const completedProjects =
    projects.filter((p: any) =>
      p.status
        ?.toLowerCase()
        .includes(
          "completed"
        )
    ).length;

  const ongoingProjects =
    projects.filter((p: any) =>
      p.status
        ?.toLowerCase()
        .includes(
          "ongoing"
        )
    ).length;

  const pendingProjects =
    projects.filter((p: any) =>
      p.status
        ?.toLowerCase()
        .includes(
          "pending"
        )
    ).length;

  /* =========================
     Revenue Prediction
  ========================= */

  const revenueGrowth =
    totalProjects * 450;

  /* =========================
     Monthly Prediction Graph
  ========================= */

  const growthData = [

    {
      month: "Jan",

      projects:
        Math.floor(
          totalProjects * 0.2
        ),

      revenue:
        Math.floor(
          revenueGrowth * 0.2
        ),
    },

    {
      month: "Feb",

      projects:
        Math.floor(
          totalProjects * 0.3
        ),

      revenue:
        Math.floor(
          revenueGrowth * 0.3
        ),
    },

    {
      month: "Mar",

      projects:
        Math.floor(
          totalProjects * 0.45
        ),

      revenue:
        Math.floor(
          revenueGrowth * 0.45
        ),
    },

    {
      month: "Apr",

      projects:
        Math.floor(
          totalProjects * 0.6
        ),

      revenue:
        Math.floor(
          revenueGrowth * 0.6
        ),
    },

    {
      month: "May",

      projects:
        Math.floor(
          totalProjects * 0.8
        ),

      revenue:
        Math.floor(
          revenueGrowth * 0.8
        ),
    },

    {
      month: "Jun",

      projects:
        totalProjects,

      revenue:
        revenueGrowth,
    },
  ];

  /* =========================
     Project Status Pie
  ========================= */

  const projectStatus = [

    {
      name: "Completed",

      value:
        completedProjects,
    },

    {
      name: "Ongoing",

      value:
        ongoingProjects,
    },

    {
      name: "Pending",

      value:
        pendingProjects,
    },
  ];

  /* =========================
     Employee Productivity
  ========================= */

  const ownerMap: any = {};

  projects.forEach(
    (project: any) => {

      const owner =
        project.project_owner ||
        "Unknown";

      ownerMap[owner] =
        (ownerMap[owner] || 0) + 1;
    }
  );

  const employeeData =
    Object.keys(ownerMap)

      .slice(0, 6)

      .map((owner) => ({

        employee:
          owner,

        tasks:
          ownerMap[owner],
      }));

  /* =========================
     AI Opportunity Prediction
  ========================= */

  const opportunityMap: any = {

    Diamond: 0,

    Gold: 0,

    Platinum: 0,

    Silver: 0,

    Bronze: 0,

    NA: 0,
  };

  projects.forEach(
    (project: any) => {

      const status =
        project.status
          ?.toLowerCase() || "";

      const category =
        project.category
          ?.toLowerCase() ||
        "";

      /* Diamond */

      if (

        status.includes(
          "completed"
        ) &&

        category.includes(
          "automation"
        )

      ) {

        opportunityMap[
          "Diamond"
        ]++;

      }

      /* Gold */

      else if (
        status.includes(
          "completed"
        )
      ) {

        opportunityMap[
          "Gold"
        ]++;

      }

      /* Platinum */

      else if (
        status.includes(
          "ongoing"
        )
      ) {

        opportunityMap[
          "Platinum"
        ]++;

      }

      /* Silver */

      else if (
        status.includes(
          "feasibility"
        )
      ) {

        opportunityMap[
          "Silver"
        ]++;

      }

      /* Bronze */

      else if (
        status.includes(
          "hold"
        )
      ) {

        opportunityMap[
          "Bronze"
        ]++;

      }

      else {

        opportunityMap[
          "NA"
        ]++;
      }
    }
  );

  /* =========================
     Pie Conversion
  ========================= */

  const opportunityData =
    Object.keys(
      opportunityMap
    ).map((key) => ({

      name: key,

      value:
        opportunityMap[key],
    }));

  /* =========================
     Colors
  ========================= */

  const COLORS = [

    "#22c55e",

    "#3b82f6",

    "#facc15",
  ];

  const OPPORTUNITY_COLORS = [

    "#228be6",

    "#1c2faa",

    "#f08c42",

    "#7b0c9e",

    "#e649b5",

    "#6f42c1",
  ];

  return (

    <AppLayout>

      <div className="space-y-6 animate-fade-in">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">

            Business Analytics

          </h1>

          <p className="text-muted-foreground mt-1">

            Live MongoDB business analytics

          </p>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total */}

          <Card>

            <CardContent className="pt-6">

              <p className="text-muted-foreground text-sm">

                Total Projects

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {totalProjects}

              </h2>

            </CardContent>

          </Card>

          {/* Revenue */}

          <Card>

            <CardContent className="pt-6">

              <p className="text-muted-foreground text-sm">

                Revenue Growth

              </p>

              <h2 className="text-3xl font-bold mt-2">

                +
                {Math.floor(
                  totalProjects * 1.2
                )}
                %

              </h2>

            </CardContent>

          </Card>

          {/* Completed */}

          <Card>

            <CardContent className="pt-6">

              <p className="text-muted-foreground text-sm">

                Completed Projects

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {
                  completedProjects
                }

              </h2>

            </CardContent>

          </Card>

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Growth */}

          <Card>

            <CardHeader>

              <CardTitle>

                Monthly Business Growth

              </CardTitle>

            </CardHeader>

            <CardContent>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart
                  data={growthData}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="projects"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22c55e"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </CardContent>

          </Card>

          {/* Status */}

          <Card>

            <CardHeader>

              <CardTitle>

                Project Status Distribution

              </CardTitle>

            </CardHeader>

            <CardContent>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={projectStatus}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {projectStatus.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </CardContent>

          </Card>

        </div>

        {/* Employee Productivity */}

        <Card>

          <CardHeader>

            <CardTitle>

              Employee Productivity

            </CardTitle>

          </CardHeader>

          <CardContent>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart
                data={employeeData}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="employee" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="tasks"
                  fill="#8b5cf6"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </CardContent>

        </Card>

        {/* Business Opportunity */}

        <Card>

          <CardHeader>

            <CardTitle>

              Business Opportunity Prediction

            </CardTitle>

          </CardHeader>

          <CardContent>

            <ResponsiveContainer
              width="100%"
              height={400}
            >

              <PieChart>

                <Pie
                  data={opportunityData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  label
                >

                  {opportunityData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          OPPORTUNITY_COLORS[
                            index %
                              OPPORTUNITY_COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </CardContent>

        </Card>

      </div>

    </AppLayout>

  );
};

export default BusinessAnalytics;