import {
  useEffect,
  useState,
} from "react";

import { AppLayout } from "@/components/AppLayout";

import PROJECT_API from "@/api/projectApi";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* =========================
   Employees Page
========================= */

const Employees = () => {

  const [projects, setProjects] =
    useState<any[]>([]);

  const [
    selectedEmployee,

    setSelectedEmployee,

  ] = useState<string | null>(
    null
  );

  const [openAdd, setOpenAdd] =
    useState(false);

  const [
    selectedProject,

    setSelectedProject,

  ] = useState("");

  const [
    selectedEmpForAssign,

    setSelectedEmpForAssign,

  ] = useState("");

  /* =========================
     Current User
  ========================= */

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );

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

          console.log(
            error
          );

        }
      };

    fetchProjects();

  }, []);

  /* =========================
     Employees Map
  ========================= */

  const employeesMap:
    Record<string, any> = {};

  projects.forEach((p: any) => {

    /* =========================
       PROJECT OWNER
    ========================= */

    const owner =
      p.project_owner;

    if (
      owner &&
      !employeesMap[owner]
    ) {

      employeesMap[owner] = {

        name: owner,

        email:
          `${owner
            .replace(/\s/g, "")
            .toLowerCase()}@company.com`,

        total: 0,

        active: 0,
      };
    }

    if (owner) {

      employeesMap[owner]
        .total += 1;

      if (
        p.status
          ?.toLowerCase()
          .includes("ongoing")
      ) {

        employeesMap[owner]
          .active += 1;
      }
    }

    /* =========================
       EMPLOYEE ARRAY
    ========================= */

    (p.employees || [])
      .forEach(
        (emp: string) => {

          if (
            !employeesMap[emp]
          ) {

            employeesMap[emp] = {

              name: emp,

              email:
                `${emp
                  .replace(
                    /\s/g,
                    ""
                  )
                  .toLowerCase()}@company.com`,

              total: 0,

              active: 0,
            };
          }

          employeesMap[emp]
            .total += 1;

          if (
            p.status
              ?.toLowerCase()
              .includes(
                "ongoing"
              )
          ) {

            employeesMap[emp]
              .active += 1;
          }
        }
      );
  });

  const employees =
    Object.values(
      employeesMap
    );

  /* =========================
     Assign Employee
  ========================= */

  const handleAssign =
    async () => {

      if (
        !selectedProject ||
        !selectedEmpForAssign
      )
        return;

      try {

        const project =
          projects.find(
            (p: any) =>

              p._id ===
              selectedProject
          );

        const updatedEmployees =
          [
            ...(
              project
                ?.employees ||
              []
            ),

            selectedEmpForAssign,
          ];

        await PROJECT_API.put(
          `/${selectedProject}`,
          {
            employees:
              updatedEmployees,
          }
        );

        setProjects(
          (prev) =>

            prev.map(
              (p: any) =>

                p._id ===
                selectedProject

                  ? {

                      ...p,

                      employees:
                        updatedEmployees,
                    }

                  : p
            )
        );

        setOpenAdd(
          false
        );

        setSelectedProject(
          ""
        );

        setSelectedEmpForAssign(
          ""
        );

      }

      catch (error) {

        console.log(
          error
        );

      }
    };

  /* =========================
     Employee Projects
  ========================= */

  const employeeProjects =
    projects.filter(
      (p: any) => {

        const ownerMatch =
          p.project_owner ===
          selectedEmployee;

        const employeeMatch =
          (
            p.employees ||
            []
          ).includes(
            selectedEmployee
          );

        return (
          ownerMatch ||
          employeeMatch
        );
      }
    );

  return (

    <AppLayout>

      <div className="space-y-6 animate-fade-in">

        {/* =========================
            Header
        ========================= */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-2xl font-bold">

              Employees

            </h1>

            <p className="text-muted-foreground mt-1">

              Employee project assignments

            </p>

          </div>

          {(currentUser?.role ===
            "admin" ||

            currentUser?.role ===
              "manager") && (

            <Button
              onClick={() =>
                setOpenAdd(
                  true
                )
              }
            >

              Add Employee to Project

            </Button>

          )}

        </div>

        {/* =========================
            Employee Table
        ========================= */}

        <Card>

          <CardContent className="p-0">

            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead>
                    Employee
                  </TableHead>

                  <TableHead>
                    Email
                  </TableHead>

                  <TableHead>
                    Assigned Projects
                  </TableHead>

                  <TableHead>
                    Active
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

                {employees.map(
                  (
                    e: any,
                    i: number
                  ) => (

                    <TableRow
                      key={i}
                      className="
                        cursor-pointer
                        hover:bg-muted/50
                      "
                      onClick={() =>
                        setSelectedEmployee(
                          e.name
                        )
                      }
                    >

                      <TableCell>

                        <div className="flex items-center gap-3">

                          <Avatar className="h-8 w-8">

                            <AvatarFallback>

                              {e.name
                                .slice(
                                  0,
                                  2
                                )
                                .toUpperCase()}

                            </AvatarFallback>

                          </Avatar>

                          {e.name}

                        </div>

                      </TableCell>

                      <TableCell>

                        {e.email}

                      </TableCell>

                      <TableCell>

                        {e.total}

                      </TableCell>

                      <TableCell>

                        <Badge>

                          {e.active}

                        </Badge>

                      </TableCell>

                    </TableRow>

                  )
                )}

              </TableBody>

            </Table>

          </CardContent>

        </Card>

        {/* =========================
            Employee Projects
        ========================= */}

        {selectedEmployee && (

          <Card>

            <CardContent className="pt-6">

              <h2 className="font-bold mb-4">

                Projects of{" "}
                {
                  selectedEmployee
                }

              </h2>

              <Table>

                <TableHeader>

                  <TableRow>

                    <TableHead>
                      Project
                    </TableHead>

                    <TableHead>
                      Status
                    </TableHead>

                    <TableHead>
                      Category
                    </TableHead>

                  </TableRow>

                </TableHeader>

                <TableBody>

                  {employeeProjects.map(
                    (
                      p: any
                    ) => (

                      <TableRow
                        key={
                          p._id
                        }
                      >

                        <TableCell>

                          {
                            p.project_name
                          }

                        </TableCell>

                        <TableCell>

                          {
                            p.status
                          }

                        </TableCell>

                        <TableCell>

                          {
                            p.category
                          }

                        </TableCell>

                      </TableRow>

                    )
                  )}

                </TableBody>

              </Table>

            </CardContent>

          </Card>

        )}

        {/* =========================
            Assign Modal
        ========================= */}

        <Dialog
          open={openAdd}
          onOpenChange={
            setOpenAdd
          }
        >

          <DialogContent>

            <DialogHeader>

              <DialogTitle>

                Add Employee to Project

              </DialogTitle>

            </DialogHeader>

            {/* Employee Select */}

            <Select
              onValueChange={
                setSelectedEmpForAssign
              }
            >

              <SelectTrigger>

                <SelectValue placeholder="Select Employee" />

              </SelectTrigger>

              <SelectContent>

                {employees.map(
                  (
                    e: any,
                    i: number
                  ) => (

                    <SelectItem
                      key={i}
                      value={
                        e.name
                      }
                    >

                      {e.name}

                    </SelectItem>

                  )
                )}

              </SelectContent>

            </Select>

            {/* Project Select */}

            <Select
              onValueChange={
                setSelectedProject
              }
            >

              <SelectTrigger>

                <SelectValue placeholder="Select Project" />

              </SelectTrigger>

              <SelectContent>

                {projects.map(
                  (
                    p: any
                  ) => (

                    <SelectItem
                      key={
                        p._id
                      }
                      value={
                        p._id
                      }
                    >

                      {
                        p.project_name
                      }

                    </SelectItem>

                  )
                )}

              </SelectContent>

            </Select>

            {/* Assign Button */}

            <Button
              className="w-full mt-4"
              onClick={
                handleAssign
              }
            >

              Assign

            </Button>

          </DialogContent>

        </Dialog>

      </div>

    </AppLayout>

  );
};

export default Employees;