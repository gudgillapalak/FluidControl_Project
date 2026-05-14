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

import { Trash2 } from "lucide-react";

/* =========================
   Deleted Projects
========================= */

const DeletedProjects = () => {

  const [
    deletedProjects,

    setDeletedProjects,

  ] = useState<any[]>([]);

  /* =========================
     Fetch Deleted
  ========================= */

  useEffect(() => {

    const fetchDeleted =
      async () => {

        try {

          const res =
            await PROJECT_API.get(
              "/deleted"
            );

          setDeletedProjects(
            res.data
          );

        }

        catch (error) {

          console.log(error);

        }
      };

    fetchDeleted();

  }, []);

  return (

    <AppLayout>

      <div className="space-y-6 animate-fade-in">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">

            Deleted Projects

          </h1>

          <p className="text-muted-foreground mt-1">

            Removed projects from MongoDB

          </p>

        </div>

        {/* Empty */}

        {deletedProjects.length === 0 && (

          <Card>

            <CardContent className="py-10 text-center">

              <p className="text-muted-foreground">

                No deleted projects found

              </p>

            </CardContent>

          </Card>

        )}

        {/* Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {deletedProjects.map(
            (
              project: any
            ) => (

              <Card
                key={project._id}
                className="
                  border-red-200
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

                    <Trash2 className="h-6 w-6 text-red-500" />

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

                    <span className="font-medium text-red-500">

                      Deleted

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

export default DeletedProjects;