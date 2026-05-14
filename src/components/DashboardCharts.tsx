import { useMemo, useState, useEffect } from "react";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  groupStatus,
  STATUS_GROUP_COLORS,
} from "@/types/project";

export const DashboardCharts = () => {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [dateFrom, setDateFrom] =
    useState("");

  const [dateTo, setDateTo] =
    useState("");

  /* =========================
     FETCH PROJECTS FROM DB
  ========================= */

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(

        `${import.meta.env.VITE_API_URL}/api/projects`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      setProjects(data);

    }

    catch (error) {

      console.log(error);

    }
  };

  /* =========================
     FILTER
  ========================= */

  const filtered = useMemo(() => {

    let result = [...projects];

    if (statusFilter !== "all") {

      result = result.filter(

        (p) =>
          groupStatus(p.status) ===
          statusFilter
      );
    }

    if (dateFrom) {

      result = result.filter(

        (p) =>
          p.start_date &&
          p.start_date >= dateFrom
      );
    }

    if (dateTo) {

      result = result.filter(

        (p) =>
          p.end_date &&
          p.end_date <= dateTo
      );
    }

    return result;

  }, [
    projects,
    statusFilter,
    dateFrom,
    dateTo,
  ]);

  /* =========================
     STATUS PIE
  ========================= */

  const statusData = useMemo(() => {

    const counts: any = {};

    filtered.forEach((p) => {

      const g =
        groupStatus(p.status);

      counts[g] =
        (counts[g] || 0) + 1;
    });

    return Object.entries(counts).map(

      ([name, value]) => ({

        name,

        value,

        fill:
          STATUS_GROUP_COLORS[
            name
          ] || "#8884d8",
      })
    );

  }, [filtered]);

  /* =========================
     OWNER BAR
  ========================= */

  const ownerData = useMemo(() => {

    const counts: any = {};

    filtered.forEach((p: any) => {

      const owner =
        p.project_owner ||
        "Unassigned";

      counts[owner] =
        (counts[owner] || 0) + 1;
    });

    return Object.entries(counts)

      .map(([name, count]) => ({
        name,
        count,
      }))

      .sort(
        (a: any, b: any) =>
          b.count - a.count
      )

      .slice(0, 10);

  }, [filtered]);

  /* =========================
     CATEGORY PIE
  ========================= */

  const categoryData = useMemo(() => {

    const counts: any = {};

    filtered.forEach((p: any) => {

      const cat =
        p.category || "Unknown";

      counts[cat] =
        (counts[cat] || 0) + 1;
    });

    return Object.entries(counts).map(

      ([name, value]) => ({
        name,
        value,
      })
    );

  }, [filtered]);

  /* =========================
     MARKET BAR
  ========================= */

  const marketData = useMemo(() => {

    const counts: any = {};

    filtered.forEach((p: any) => {

      const market =
        p.market_segment ||
        "Unknown";

      counts[market] =
        (counts[market] || 0) + 1;
    });

    return Object.entries(counts)

      .map(([name, count]) => ({
        name,
        count,
      }))

      .sort(
        (a: any, b: any) =>
          b.count - a.count
      );

  }, [filtered]);

  /* =========================
     BUSINESS PIE
  ========================= */

  const businessData = useMemo(() => {

    const counts: any = {};

    filtered.forEach((p: any) => {

      const type =
        p.business_opportunity ||
        "NA";

      counts[type] =
        (counts[type] || 0) + 1;
    });

    return Object.entries(counts).map(

      ([name, value]) => ({
        name,
        value,
      })
    );

  }, [filtered]);

  /* =========================
     OVERALL STATUS PIE
  ========================= */

  const overallStatusData = useMemo(() => {

    const counts: any = {};

    filtered.forEach((p: any) => {

      const status =
        groupStatus(p.status);

      counts[status] =
        (counts[status] || 0) + 1;
    });

    return Object.entries(counts).map(

      ([name, value]) => ({
        name,
        value,
      })
    );

  }, [filtered]);

  return (

    <div className="space-y-6">

      {/* FILTERS */}

      <div className="chart-container">

        <h3>Filters</h3>

        <div className="grid grid-cols-3 gap-4">

          <div>

            <Label>Status</Label>

            <Select
              value={statusFilter}
              onValueChange={
                setStatusFilter
              }
            >

              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="all">
                  All
                </SelectItem>

                <SelectItem value="Completed">
                  Completed
                </SelectItem>

                <SelectItem value="Ongoing">
                  Ongoing
                </SelectItem>

                <SelectItem value="On Hold">
                  On Hold
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div>

            <Label>From</Label>

            <Input
              type="date"
              value={dateFrom}
              onChange={(e) =>
                setDateFrom(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <Label>To</Label>

            <Input
              type="date"
              value={dateTo}
              onChange={(e) =>
                setDateTo(
                  e.target.value
                )
              }
            />

          </div>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* STATUS */}

        <div className="chart-container">

          <h3>Status Distribution</h3>

          <ResponsiveContainer height={280}>

            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                innerRadius={60}
              >

                {statusData.map(
                  (e, i) => (

                    <Cell
                      key={i}
                      fill={e.fill}
                    />
                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* OWNER */}

        <div className="chart-container">

          <h3>Projects per Owner</h3>

          <ResponsiveContainer height={280}>

            <BarChart
              data={ownerData}
              layout="vertical"
            >

              <XAxis type="number" />

              <YAxis
                dataKey="name"
                type="category"
                width={120}
              />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#3b82f6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};