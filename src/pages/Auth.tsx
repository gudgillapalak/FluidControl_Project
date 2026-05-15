import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import API from "@/api/authApi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useToast } from "@/hooks/use-toast";

import {
  BarChart3,
  Shield,
  UserCog,
  User,
} from "lucide-react";

/* =========================
   Role Selection
========================= */

const roles = [
  {
    label: "Super User",
    role: "admin",
    icon: Shield,
    color:
      "bg-destructive/10 text-destructive border-destructive/20",
  },

  {
    label: "Manager",
    role: "manager",
    icon: UserCog,
    color:
      "bg-warning/10 text-warning border-warning/20",
  },

  {
    label: "Employee",
    role: "employee",
    icon: User,
    color:
      "bg-success/10 text-success border-success/20",
  },
];

/* =========================
   Auth Page
========================= */

const Auth = () => {

  const navigate = useNavigate();

  const { toast } = useToast();

  const auth = useAuth();

  /* =========================
     Selected Role
  ========================= */

  const [selectedRole, setSelectedRole] =
    useState<string | null>(null);

  /* =========================
     Login State
  ========================= */

  const [loginEmail, setLoginEmail] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  /* =========================
     Signup State
  ========================= */

  const [signupName, setSignupName] =
    useState("");

  const [signupEmail, setSignupEmail] =
    useState("");

  const [signupPassword, setSignupPassword] =
    useState("");

  /* =========================
     LOGIN
  ========================= */
const handleLogin = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  try {

    const res = await API.post(
      "/login",
      {
        email: loginEmail,
        password: loginPassword,
      }
    );

    const user =
      res.data.user;

    const token =
      res.data.token;

    /* Save */

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        token,
      })
    );

    /* FIX FOR DASHBOARD */
    localStorage.setItem(
      "token",
      token
    );

    auth.setUser({
      ...user,
      token,
    });

    auth.setRole(user.role);

    /* Success */

    toast({

      title:
        "Login Successful",

      description:
        `Welcome ${user.role}!`,
    });

    /* Navigation */

    if (
      user.role === "admin"
    ) {

      navigate("/dashboard");

    }

    else if (
      user.role === "manager"
    ) {

      navigate("/projects");

    }

    else {

      navigate("/employees");

    }

  }

  catch (error: any) {

    toast({

      title: "Login Failed",

      description:
  error?.message ||
  error.response?.data?.message ||
  JSON.stringify(error),

      variant:
        "destructive",
    });

  }
};

  /* =========================
     SIGNUP
  ========================= */

  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await API.post(
        "/signup",
        {
          name: signupName,

          email: signupEmail,

          password:
            signupPassword,

          role:
            selectedRole,
        }
      );

      toast({

        title:
          "Signup Successful",

        description:
          "Account created successfully",
      });

    }

    catch (error: any) {

      toast({

        title:
          "Signup Failed",

        description:
  error?.message ||
  error.response?.data?.message ||
  JSON.stringify(error),

        variant:
          "destructive",
      });

    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-background
        p-4
      "
    >

      <div className="w-full max-w-md">

        {/* =========================
            Logo
        ========================= */}

        <div
          className="
            flex items-center
            justify-center
            gap-3 mb-8
          "
        >

          <div
            className="
              h-12 w-12
              rounded-xl
              bg-primary
              flex items-center
              justify-center
            "
          >

            <BarChart3
              className="
                h-7 w-7
                text-primary-foreground
              "
            />

          </div>

          <h1 className="text-3xl font-bold">

            ProjectHub

          </h1>

        </div>

        {/* =========================
            Role Selection
        ========================= */}

        {!selectedRole && (

          <Card>

            <CardHeader className="text-center">

              <CardTitle>

                Select Role

              </CardTitle>

              <CardDescription>

                Choose how you want to continue

              </CardDescription>

            </CardHeader>

            <CardContent>

              <div className="grid grid-cols-1 gap-4">

                {roles.map((r) => (

                  <button
                    key={r.role}
                    onClick={() =>
                      setSelectedRole(
                        r.role
                      )
                    }
                    className={`
                      flex items-center gap-4
                      p-5 rounded-xl border
                      hover:scale-[1.02]
                      transition-all duration-300
                      ${r.color}
                    `}
                  >

                    <r.icon className="h-7 w-7" />

                    <div className="text-left">

                      <h2 className="font-semibold text-lg">

                        {r.label}

                      </h2>

                      <p className="text-xs opacity-70">

                        Continue as {r.role}

                      </p>

                    </div>

                  </button>

                ))}

              </div>

            </CardContent>

          </Card>

        )}

        {/* =========================
            Auth Card
        ========================= */}

        {selectedRole && (

          <Card>

            <CardHeader className="text-center">

              <CardTitle className="text-3xl">

                {selectedRole.toUpperCase()}

              </CardTitle>

              <CardDescription>

                Sign in to continue

              </CardDescription>

            </CardHeader>

            <CardContent>

              <Tabs defaultValue="login">

                <TabsList className="grid w-full grid-cols-2">

                  <TabsTrigger value="login">

                    Sign In

                  </TabsTrigger>

                  <TabsTrigger value="signup">

                    Sign Up

                  </TabsTrigger>

                </TabsList>

                {/* LOGIN */}

                <TabsContent value="login">

                  <form
                    onSubmit={handleLogin}
                    className="space-y-4 mt-4"
                  >

                    <div>

                      <Label>Email</Label>

                      <Input
                        type="email"
                        value={loginEmail}
                        onChange={(e) =>
                          setLoginEmail(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <div>

                      <Label>Password</Label>

                      <Input
                        type="password"
                        value={loginPassword}
                        onChange={(e) =>
                          setLoginPassword(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                    >

                      Sign In

                    </Button>

                  </form>

                </TabsContent>

                {/* SIGNUP */}

                <TabsContent value="signup">

                  <form
                    onSubmit={handleSignup}
                    className="space-y-4 mt-4"
                  >

                    <div>

                      <Label>
                        Full Name
                      </Label>

                      <Input
                        value={signupName}
                        onChange={(e) =>
                          setSignupName(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <div>

                      <Label>Email</Label>

                      <Input
                        type="email"
                        value={signupEmail}
                        onChange={(e) =>
                          setSignupEmail(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <div>

                      <Label>
                        Password
                      </Label>

                      <Input
                        type="password"
                        value={signupPassword}
                        onChange={(e) =>
                          setSignupPassword(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                    >

                      Sign Up

                    </Button>

                  </form>

                </TabsContent>

              </Tabs>

              {/* Back Button */}

              <button
                onClick={() =>
                  setSelectedRole(null)
                }
                className="
                  text-sm mt-4
                  text-muted-foreground
                  hover:underline
                "
              >

                ← Change Role

              </button>

            </CardContent>

          </Card>

        )}

      </div>

    </div>

  );
};

export default Auth;