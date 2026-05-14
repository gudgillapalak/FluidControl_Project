import { useState } from "react";

import { AppLayout } from "@/components/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";

import PROJECT_API from "@/api/projectApi";

const AddProject = () => {

  const { toast } =
    useToast();

  const [loading, setLoading] =
    useState(false);

  const [project, setProject] =
    useState({

      projectName: "",

      clientName: "",

      manager: "",

      description: "",

      deadline: "",

      priority: "",

      status: "",
    });

  /* =========================
     Handle Change
  ========================= */

  const handleChange = (
    e:
      React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >
  ) => {

    setProject({

      ...project,

      [e.target.name]:
        e.target.value,
    });
  };

  /* =========================
     Submit
  ========================= */

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        await PROJECT_API.post(
          "/",
          {

            project_name:
              project.projectName,

            client_name:
              project.clientName,

            project_owner:
              project.manager,

            description:
              project.description,

            end_date:
              project.deadline,

            priority:
              project.priority,

            status:
              project.status,

            isCompleted:
              project.status
                .toLowerCase()
                .includes(
                  "completed"
                ),

            isDeleted:
              false,
          }
        );

        toast({

          title:
            "Project Added",

          description:
            `${project.projectName} created successfully`,
        });

        /* Reset */

        setProject({

          projectName: "",

          clientName: "",

          manager: "",

          description: "",

          deadline: "",

          priority: "",

          status: "",
        });

      }

      catch (error) {

        console.log(error);

        toast({

          title:
            "Error",

          description:
            "Failed to create project",
        });
      }

      finally {

        setLoading(false);
      }
    };

  return (

    <AppLayout>

      <div className="space-y-6 animate-fade-in">

        {/* Header */}

        <div>

          <h1 className="text-2xl font-bold">

            Add Project

          </h1>

          <p className="text-muted-foreground mt-1">

            Create and assign a new project

          </p>

        </div>

        {/* Card */}

        <Card>

          <CardHeader>

            <CardTitle>

              Project Details

            </CardTitle>

          </CardHeader>

          <CardContent>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Project */}

                <div>

                  <Label>
                    Project Name
                  </Label>

                  <Input
                    name="projectName"
                    value={project.projectName}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Client */}

                <div>

                  <Label>
                    Client Name
                  </Label>

                  <Input
                    name="clientName"
                    value={project.clientName}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Manager */}

                <div>

                  <Label>
                    Manager Name
                  </Label>

                  <Input
                    name="manager"
                    value={project.manager}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Deadline */}

                <div>

                  <Label>
                    Deadline
                  </Label>

                  <Input
                    type="date"
                    name="deadline"
                    value={project.deadline}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Priority */}

                <div>

                  <Label>
                    Priority
                  </Label>

                  <Input
                    name="priority"
                    value={project.priority}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Status */}

                <div>

                  <Label>
                    Status
                  </Label>

                  <Input
                    name="status"
                    value={project.status}
                    onChange={handleChange}
                    placeholder="Ongoing / Completed"
                    required
                  />

                </div>

              </div>

              {/* Description */}

              <div>

                <Label>
                  Description
                </Label>

                <Textarea
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  className="min-h-[120px]"
                />

              </div>

              {/* Submit */}

              <Button
                type="submit"
                disabled={loading}
              >

                {
                  loading
                    ? "Adding..."
                    : "Add Project"
                }

              </Button>

            </form>

          </CardContent>

        </Card>

      </div>

    </AppLayout>
  );
};

export default AddProject;