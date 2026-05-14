import { useState, useMemo, useEffect } from "react";

import { AppLayout } from "@/components/AppLayout";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import PROJECT_API from "@/api/projectApi";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Eye } from "lucide-react";

import { groupStatus } from "@/types/project";

/* =========================
   Status Badge Color
========================= */

const statusBadgeColor = (
  status: string
) => {

  const group =
    groupStatus(status);

  const colors: Record<
    string,
    string
  > = {

    Completed:
      "bg-success/10 text-success border-success/20",

    Ongoing:
      "bg-info/10 text-info border-info/20",

    "On Hold":
      "bg-warning/10 text-warning border-warning/20",

    "On Demand":
      "bg-accent text-accent-foreground",

    "Feasibility/Quotation":
      "bg-primary/10 text-primary border-primary/20",

    Other:
      "bg-muted text-muted-foreground",
  };

  return colors[group] || "";
};

/* =========================
   Projects Page
========================= */

const Projects = () => {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [detailProject, setDetailProject] =
    useState<any>(null);

  const [newRemark, setNewRemark] =
    useState("");

  const currentUser =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  /* =========================
     Fetch Projects
  ========================= */

  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          const res =
            await PROJECT_API.get("/");

          setProjects(res.data);

        }

        catch (error) {

          console.log(error);

        }
      };

    fetchProjects();

  }, []);

  /* =========================
     Filter
  ========================= */

  const filtered = useMemo(() => {

    return projects.filter(
      (p: any) =>

        `${p.project_name}
         ${p.status}
         ${p.project_owner}
         ${p.category}`

          .toLowerCase()

          .includes(
            search.toLowerCase()
          )
    );

  }, [projects, search]);

  /* =========================
     Assign Manager
  ========================= */

  const assignManager =
    async (
      projectId: string,
      owner: string
    ) => {

      try {

        await PROJECT_API.put(
          `/${projectId}`,
          {
            project_owner:
              owner,
          }
        );

        setProjects((prev) =>
          prev.map((p) =>

            p._id === projectId

              ? {
                  ...p,
                  project_owner:
                    owner,
                }

              : p
          )
        );

      }

      catch (error) {

        console.log(error);

      }
    };

  /* =========================
     Remove Manager
  ========================= */

  const removeManager =
    async (
      projectId: string
    ) => {

      try {

        await PROJECT_API.put(
          `/${projectId}`,
          {
            project_owner:
              null,
          }
        );

        setProjects((prev) =>
          prev.map((p) =>

            p._id === projectId

              ? {
                  ...p,
                  project_owner:
                    null,
                }

              : p
          )
        );

      }

      catch (error) {

        console.log(error);

      }
    };

  /* =========================
     Add Remark
  ========================= */

  const addRemark =
    async () => {

      if (
        !newRemark.trim() ||
        !detailProject
      ) {
        return;
      }

      try {

        const updatedRemarks =
          [
            ...(detailProject.remarks ||
              []),

            {
              message:
                newRemark,

              user:
                currentUser.email,

              createdAt:
                new Date(),
            },
          ];

        await PROJECT_API.put(
          `/${detailProject._id}`,
          {
            remarks:
              updatedRemarks,
          }
        );

        const updatedProjects =
          projects.map((p) =>

            p._id ===
            detailProject._id

              ? {
                  ...p,
                  remarks:
                    updatedRemarks,
                }

              : p
          );

        setProjects(
          updatedProjects
        );

        setDetailProject({

          ...detailProject,

          remarks:
            updatedRemarks,
        });

        setNewRemark("");

      }

      catch (error) {

        console.log(error);

      }
    };

  return (

    <AppLayout>

      <div className="space-y-6 animate-fade-in">

        {/* Header */}

        <div>

          <h1 className="text-2xl font-heading font-bold text-foreground">

            Projects

          </h1>

          <p className="text-muted-foreground mt-1">

            Live projects from MongoDB

          </p>

        </div>

        {/* Search */}

        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        {/* Table */}

        <Card>

          <CardContent className="p-0">

            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead>
                    Project
                  </TableHead>

                  <TableHead>
                    Category
                  </TableHead>

                  <TableHead>
                    Owner
                  </TableHead>

                  <TableHead>
                    Status
                  </TableHead>

                  <TableHead>
                    Start
                  </TableHead>

                  <TableHead>
                    End
                  </TableHead>

                  <TableHead>
                    View
                  </TableHead>

                  <TableHead>
                    Actions
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

                {filtered.map(
                  (p: any) => (

                    <TableRow
                      key={p._id}
                      className="
                        hover:bg-muted/50
                        relative
                      "
                    >

                      {/* Name */}

                      <TableCell
                        className="cursor-pointer"
                        onClick={() =>
                          setDetailProject(
                            p
                          )
                        }
                      >

                        {p.project_name}

                      </TableCell>

                      {/* Category */}

                      <TableCell>

                        {p.category || "—"}

                      </TableCell>

                      {/* Owner */}

                      <TableCell>

                        {p.project_owner ||
                          "Not Assigned"}

                      </TableCell>

                      {/* Status */}

                      <TableCell>

                        <Badge
                          className={statusBadgeColor(
                            p.status
                          )}
                        >

                          {p.status}

                        </Badge>

                      </TableCell>

                      {/* Start */}

                      <TableCell>

                        {p.start_date || "—"}

                      </TableCell>

                      {/* End */}

                      <TableCell>

                        {p.end_date || "—"}

                      </TableCell>

                      {/* View */}

                      <TableCell
                        className="cursor-pointer"
                        onClick={() =>
                          setDetailProject(
                            p
                          )
                        }
                      >

                        <Eye className="h-4 w-4" />

                      </TableCell>

                      {/* Actions */}

<TableCell>

  {currentUser?.role ===
    "admin" && (

    <div className="flex gap-2 flex-wrap">

      {/* Assign */}

      <button
        className="
          px-2 py-1 text-xs
          bg-blue-500
          hover:bg-blue-600
          text-white
          rounded
        "
        onClick={(e) => {

          e.stopPropagation();

          const name =
            prompt(
              "Enter manager name"
            );

          if (name) {

            assignManager(
              p._id,
              name
            );
          }
        }}
      >

        Assign

      </button>

      {/* Remove */}

      <button
        className="
          px-2 py-1 text-xs
          bg-red-500
          hover:bg-red-600
          text-white
          rounded
        "
        onClick={(e) => {

          e.stopPropagation();

          removeManager(
            p._id
          );
        }}
      >

        Remove

      </button>

      {/* Complete */}

      {!p.isCompleted && (

        <button
          className="
            px-2 py-1 text-xs
            bg-green-600
            hover:bg-green-700
            text-white
            rounded
          "
          onClick={async (e) => {

            e.stopPropagation();

            try {

              await PROJECT_API.put(
                `/complete/${p._id}`
              );

              setProjects(
                (prev) =>

                  prev.map(
                    (proj) =>

                      proj._id === p._id

                        ? {

                            ...proj,

                            isCompleted: true,

                            status:
                              "Completed",
                          }

                        : proj
                  )
              );

            }

            catch (error) {

              console.log(
                error
              );
            }
          }}
        >

          Complete

        </button>

      )}

      {/* Delete */}

      <button
        className="
          px-2 py-1 text-xs
          bg-black
          hover:bg-gray-800
          text-white
          rounded
        "
        onClick={async (e) => {

          e.stopPropagation();

          const confirmDelete =
            window.confirm(
              "Move project to deleted projects?"
            );

          if (
            !confirmDelete
          ) return;

          try {

            await PROJECT_API.put(
              `/delete/${p._id}`
            );

            setProjects(
              (prev) =>

                prev.filter(
                  (proj) =>

                    proj._id !==
                    p._id
                )
            );

          }

          catch (error) {

            console.log(
              error
            );
          }
        }}
      >

        Delete

      </button>

    </div>

  )}

</TableCell>

                    </TableRow>

                  )
                )}

              </TableBody>

            </Table>

          </CardContent>

        </Card>

        {/* =========================
            Details Popup
        ========================= */}

        <Dialog
          open={!!detailProject}
          onOpenChange={() =>
            setDetailProject(
              null
            )
          }
        >

          <DialogContent>

            <DialogHeader>

              <DialogTitle>

                {
                  detailProject?.project_name
                }

              </DialogTitle>

            </DialogHeader>

            {detailProject && (

              <div className="space-y-5 text-sm">

                {/* Info */}

                <div className="space-y-2">

                  <p>

                    <b>Owner:</b>{" "}
                    {
                      detailProject.project_owner
                    }

                  </p>

                  <p>

                    <b>Status:</b>{" "}
                    {
                      detailProject.status
                    }

                  </p>

                  <p>

                    <b>Category:</b>{" "}
                    {
                      detailProject.category
                    }

                  </p>

                  <p>

                    <b>Start:</b>{" "}
                    {
                      detailProject.start_date
                    }

                  </p>

                  <p>

                    <b>End:</b>{" "}
                    {
                      detailProject.end_date
                    }

                  </p>

                </div>

                {/* Remarks */}

                <div className="border-t pt-4">

                  <h3 className="font-semibold mb-3">

                    Remarks & Updates

                  </h3>

                  <div className="flex gap-2 mb-4">

                    <Input
                      placeholder="Add remark..."
                      value={newRemark}
                      onChange={(e) =>
                        setNewRemark(
                          e.target.value
                        )
                      }
                    />

                    <button
                      onClick={addRemark}
                      className="
                        px-4 py-2 rounded
                        bg-primary
                        text-white
                      "
                    >

                      Add

                    </button>

                  </div>

                  <div className="space-y-2">

                    {(
                      detailProject.remarks ||
                      []
                    ).map(
                      (
                        remark: any,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="
                            p-3 rounded-lg
                            bg-muted border
                          "
                        >

                          <p>

                            {
                              remark.message
                            }

                          </p>

                          <p className="text-xs text-muted-foreground mt-1">

                            {remark.user}

                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

            )}

          </DialogContent>

        </Dialog>

      </div>

    </AppLayout>

  );
};

export default Projects;