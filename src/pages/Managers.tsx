import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { groupStatus } from '@/types/project';

const Managers = () => {

  // ✅ Get projects from localStorage (same as Employees page)
  const projects = JSON.parse(localStorage.getItem("projects") || "[]");

  // 🔥 Get unique owners (same logic you already use)
  const ownerNames = [
    ...new Set(
      projects.map((p: any) => p.project_owner).filter(Boolean)
    ),
  ];

  const getOwnerProjects = (owner: string) =>
    projects.filter((p: any) => p.project_owner === owner);

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">

        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Managers / Owners
          </h1>
          <p className="text-muted-foreground mt-1">
            View all project owners and their projects
          </p>
        </div>

        {/* ✅ SAME UI - ONLY DATA SOURCE CHANGED */}
        {ownerNames.length > 0 && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Owner (from Excel)</TableHead>
                    <TableHead>Total Projects</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Ongoing</TableHead>
                    <TableHead>On Hold</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {ownerNames.map((owner: string) => {
                    const oProjects = getOwnerProjects(owner);

                    return (
                      <TableRow key={owner}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {owner.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{owner}</span>
                          </div>
                        </TableCell>

                        <TableCell className="font-medium">
                          {oProjects.length}
                        </TableCell>

                        <TableCell>
                          <Badge className="bg-success/10 text-success border-success/20">
                            {
                              oProjects.filter(
                                (p: any) =>
                                  groupStatus(p.status) === "Completed"
                              ).length
                            }
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge className="bg-info/10 text-info border-info/20">
                            {
                              oProjects.filter(
                                (p: any) =>
                                  groupStatus(p.status) === "Ongoing"
                              ).length
                            }
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge className="bg-warning/10 text-warning border-warning/20">
                            {
                              oProjects.filter(
                                (p: any) =>
                                  groupStatus(p.status) === "On Hold"
                              ).length
                            }
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

              </Table>
            </CardContent>
          </Card>
        )}

      </div>
    </AppLayout>
  );
};

export default Managers;