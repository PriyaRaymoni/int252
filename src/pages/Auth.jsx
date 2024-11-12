import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ThemeToggleButton from "@/ThemeToggltButton";
import { useNavigate } from "react-router-dom";
import useUser from "@/store/useUser";

function Auth() {
  const navigate = useNavigate();

  const [loginDeatils, setLoginDeatils] = useState({
    email: "",
    password: "",
  });

  const user = useUser((state) => state.user);
  const login = useUser((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginDeatils);
    if (
      loginDeatils.email === "admin@tarc.com" &&
      loginDeatils.password === "!admin@rolla^781357"
    ) {
      navigate("/admin");
    } else navigate("/");
  };

  return (
    <>
      <div className="fixed top-0 w-full flex justify-end py-2 px-6 border-b-2">
        <ThemeToggleButton />
      </div>
      <div
        className="
        flex flex-col items-center justify-center h-screen
      "
      >
        <Card className="m-2">
          <CardHeader>
            <CardTitle className="text-3xl">Login</CardTitle>
            <CardDescription className="text-lg">
              Only authorized person can login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter of your Email"
                    onChange={(e) =>
                      setLoginDeatils({
                        ...loginDeatils,
                        email: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Enter of your password"
                    onChange={(e) =>
                      setLoginDeatils({
                        ...loginDeatils,
                        password: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleLogin}
              disabled={!loginDeatils.email || !loginDeatils.password}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Auth;
