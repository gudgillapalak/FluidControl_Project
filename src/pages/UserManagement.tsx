import { useState } from "react";

import { AppLayout } from "@/components/AppLayout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {

  const { toast } = useToast();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("manager");

  const handleCreate =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await fetch(

            `${import.meta.env.VITE_API_URL}/api/auth/create-user`,

            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({

                name,

                email,

                password,

                role,
              }),
            }
          );

        const data =
          await res.json();

        if (!res.ok) {

          throw new Error(
            data.message
          );
        }

        toast({

          title:
            data.message,
        });

        setName("");
        setEmail("");
        setPassword("");

      }

      catch (error: any) {

        toast({

          title:
            error.message,

          variant:
            "destructive",
        });
      }
    };

  return (

    <AppLayout>

      <div className="max-w-xl mx-auto">

        <Card>

          <CardHeader>

            <CardTitle>

              User Management

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-4">

            <div>

              <Label>
                Name
              </Label>

              <Input
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

            </div>

            <div>

              <Label>
                Email
              </Label>

              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>

            <div>

              <Label>
                Password
              </Label>

              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

            </div>

            <div>

              <Label>
                Role
              </Label>

              <Select
                value={role}
                onValueChange={
                  setRole
                }
              >

                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="admin">
                    Admin
                  </SelectItem>

                  <SelectItem value="manager">
                    Manager
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

            <Button
              onClick={
                handleCreate
              }
              className="w-full"
            >

              Create User

            </Button>

          </CardContent>

        </Card>

      </div>

    </AppLayout>
  );
};

export default UserManagement;