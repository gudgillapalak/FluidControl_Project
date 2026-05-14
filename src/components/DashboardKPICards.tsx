import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Pause,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

const KPICard = ({
  title,
  value,
  icon: Icon,
  color,
}: any) => (

  <div className="kpi-card">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <p className="text-3xl font-bold">
          {value}
        </p>

      </div>

      <div
        className={`
          h-12
          w-12
          rounded-xl
          flex
          items-center
          justify-center
          ${color}
        `}
      >

        <Icon className="h-6 w-6" />

      </div>

    </div>

  </div>
);

export const DashboardKPICards =
  () => {

    const [projects, setProjects] =
      useState<any[]>([]);

    useEffect(() => {

      fetchProjects();

    }, []);

    const fetchProjects =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await fetch(

              `${import.meta.env.VITE_API_URL}/api/projects`,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          if (Array.isArray(data)) {

            setProjects(data);

          } else {

            setProjects([]);

          }

        }

        catch (error) {

          console.log(error);

          setProjects([]);

        }
      };

    const totalProjects =
      projects.length;

    const completed =
      projects.filter(
        (p) =>
          p.status
            ?.toLowerCase()
            .includes(
              "completed"
            )
      ).length;

    const ongoing =
      projects.filter(
        (p) =>
          p.status
            ?.toLowerCase()
            .includes(
              "ongoing"
            )
      ).length;

    const onHold =
      projects.filter(
        (p) =>
          p.status
            ?.toLowerCase()
            .includes(
              "hold"
            )
      ).length;

    return (

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >

        <KPICard
          title="Total Projects"
          value={totalProjects}
          icon={FolderKanban}
          color="
            bg-primary/10
            text-primary
          "
        />

        <KPICard
          title="Completed"
          value={completed}
          icon={CheckCircle2}
          color="
            bg-green-100
            text-green-600
          "
        />

        <KPICard
          title="Ongoing"
          value={ongoing}
          icon={Clock}
          color="
            bg-blue-100
            text-blue-600
          "
        />

        <KPICard
          title="On Hold"
          value={onHold}
          icon={Pause}
          color="
            bg-yellow-100
            text-yellow-600
          "
        />

      </div>
    );
  };