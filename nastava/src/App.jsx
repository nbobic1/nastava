import "./App.css";
import { Button } from "./@/components/ui/button";
import { Separator } from "./@/components/ui/separator";
import Question from "./components/Question";
import MakeQuestion from "./components/screens/MakeQuestion";
import MakeTest from "./components/screens/MakeTest";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import MakeGroup from "./components/screens/MakeGroup";
import StudentScreen from "./components/screens/StudentScreen";
import SingleTest from "./components/screens/SingleTest";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAtom } from "jotai";
import { isLogedinState } from "./atoms";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import { useEffect } from "react";
import Results from "./components/screens/Results";
function App() {
  const [isLogedin, setIsLogedin] = useAtom(isLogedinState);
  useEffect(() => {
    var isl = localStorage.getItem("isLogedin");
    console.log("isl", isl);
    if (isl === "true") {
      setIsLogedin(true);
    } else setIsLogedin(false);
  }, []);
  return (
    <div className="w-[90%] m-[auto] mt-5 text-center">
      <BrowserRouter>
        <div className="w-full flex-row justify-between flex m-0">
          {isLogedin === false ? (
            <>
              <Link to="/login">
                {" "}
                <Button>Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <>
              {localStorage.getItem("role") === "Profesor" ? (
                <>
                  <Link to="/makeQuestion">
                    <Button>Make question</Button>
                  </Link>
                  <Link to="/makeTest">
                    <Button>Make test</Button>{" "}
                  </Link>
                  <Link to="/makeGroup">
                    <Button>Make a group</Button>
                  </Link>
                </>
              ) : (
                <Link to="/results">
                  <Button>Results</Button>
                </Link>
              )}

              <Link to="/login">
                <Button
                  onClick={() => {
                    setIsLogedin(false);
                    localStorage.setItem("isLogedin", "false");
                    axios
                      .post(
                        "https://54.198.79.143/logout",
                        {},
                        {
                          withCredentials: true,
                          headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then(function (response) {})
                      .catch(function (error) {});
                  }}
                >
                  Logout
                </Button>
              </Link>
            </>
          )}
        </div>
        <Separator className="my-5 w-full"></Separator>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/makeQuestion"
            element={
              <ProtectedRoute>
                <MakeQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studentScreen"
            element={
              <ProtectedRoute>
                <StudentScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/singleTest/:id"
            element={
              <ProtectedRoute>
                <SingleTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/makeTest"
            element={
              <ProtectedRoute p={true}>
                <MakeTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/makeGroup"
            element={
              <ProtectedRoute p={true}>
                <MakeGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results></Results>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
