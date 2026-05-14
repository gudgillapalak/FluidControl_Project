import {
  useEffect,
  useState,
} from "react";

import { AppLayout } from "@/components/AppLayout";

import PROJECT_API from "@/api/projectApi";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BadgeCheck } from "lucide-react";

/* =========================
   Completed Projects
========================= */

const CompletedProjects = () => {

  const [
    completedProjects,

    setCompletedProjects,

  ] = useState<any[]>([]);

  /* =========================
     Fetch Completed Projects
  ========================= */

  useEffect(() => {

    const fetchCompleted =
      async () => {

        try {

          const res =
            await PROJECT_API.get(
              "/completed"
            );

          setCompletedProjects(
            res.data
          );

        }

        catch (error) {

          console.log(error);

        }
      };

    fetchCompleted();

  }, []);

  return (

    <AppLayout>

      <div className="space-y-6 animate-fade-in">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">

            Completed Projects

          </h1>

          <p className="text-muted-foreground mt-1">

            Successfully completed projects from MongoDB

          </p>

        </div>

        {/* Empty */}

        {completedProjects.length === 0 && (

          <Card>

            <CardContent className="py-10 text-center">

              <p className="text-muted-foreground">

                No completed projects found

              </p>

            </CardContent>

          </Card>

        )}

        {/* Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {completedProjects.map(
            (
              project: any
            ) => (

              <Card
                key={project._id}
                className="
                  hover:shadow-lg
                  transition-all
                "
              >

                <CardHeader>

                  <div className="flex items-center justify-between">

                    <CardTitle className="text-lg">

                      {
                        project.project_name
                      }

                    </CardTitle>

                    <BadgeCheck className="h-7 w-7 text-green-500" />

                  </div>

                </CardHeader>

                <CardContent className="space-y-4">

                  {/* Category */}

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">

                      Category

                    </span>

                    <span className="font-medium">

                      {
                        project.category || "-"
                      }

                    </span>

                  </div>

                  {/* Owner */}

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">

                      Project Owner

                    </span>

                    <span className="font-medium">

                      {
                        project.project_owner || "-"
                      }

                    </span>

                  </div>

                  {/* Start */}

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">

                      Start Date

                    </span>

                    <span className="font-medium">

                      {
                        project.start_date || "-"
                      }

                    </span>

                  </div>

                  {/* End */}

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">

                      End Date

                    </span>

                    <span className="font-medium">

                      {
                        project.end_date || "-"
                      }

                    </span>

                  </div>

                  {/* Status */}

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">

                      Status

                    </span>

                    <span className="font-medium text-green-600">

                      {
                        project.status
                      }

                    </span>

                  </div>

                </CardContent>

              </Card>

            )
          )}

        </div>

      </div>

    </AppLayout>

  );
};

export default CompletedProjects;