import type { NextPage } from "next";
import { FormEvent, useState, useContext } from "react";
import { AppContext } from "../utils/AppContext";
import { useRouter } from "next/router";
const Home: NextPage = () => {
  const route = useRouter();
  const { loggedUsername, setLoggedUsername } = useContext(AppContext);
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sError, setSError] = useState(false);
  const [lError, setLError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSendData = (e: FormEvent<HTMLFormElement>, type: "L" | "R") => {
    e.preventDefault();

    fetch("https://player-guess-game-next.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "exist") {
          setSuccess(false);
          setSError(true);
          setLError(false);
        } else if (data === "success") {
          setSuccess(true);
          setSError(false);
          setLError(false);
        } else if (data) {
          setSuccess(false);
          setSError(false);
          setLError(false);
          setLoggedUsername(username);
        } else if (!data) {
          setSuccess(false);
          setSError(false);
          setLError(true);
        }
        setUsername("");
        setPassword("");
      });
  };
  return (
    <div className="welcome text-center">
      <h1 className="mb-8 md:text-5xl text-2xl font-bold text-blue-900 text-center">
        Welcome to Player Guess!
      </h1>
      {loggedUsername === "" && !signUp ? (
        <div className="login">
          <h3 className="mb-5 text-2xl font-extrabold text-center text-green-900">
            Login to play!
          </h3>
          <form
            onSubmit={(e) => handleSendData(e, "L")}
            className="flex flex-col items-center"
          >
            <label className="inline-block mb-2 font-bold" htmlFor="username">
              Username
            </label>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              className="font-semibold mb-5 px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-60"
            />
            <label className="inline-block mb-2 font-bold" htmlFor="pw">
              Password
            </label>
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="pw"
              type="password"
              className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-60"
            />
            <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              LOGIN
            </button>
          </form>
          {lError ? (
            <p className="mt-2 text-red-900 font-bold text-center">
              Please provide a valid username and password.
            </p>
          ) : (
            ""
          )}
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <span
              className="font-bold cursor-pointer text-red-800"
              onClick={() => {
                setLError(false);
                setSError(false);
                setSuccess(false);
                setSignUp(true);
                setUsername("");
                setPassword("");
              }}
            >
              SIGN UP
            </span>
          </p>
        </div>
      ) : loggedUsername === "" && signUp ? (
        <div className="signup">
          <h3 className="mb-5 text-2xl font-extrabold text-center text-red-800">
            Let's create an account!
          </h3>
          <form
            onSubmit={(e) => handleSendData(e, "R")}
            className="flex flex-col items-center"
          >
            <label className="inline-block mb-2 font-bold" htmlFor="username">
              Username
            </label>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              className="font-semibold mb-5 px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-60"
            />
            <label className="inline-block mb-2 font-bold" htmlFor="pw">
              Password
            </label>
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="pw"
              type="password"
              className="px-3 py-2 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-60"
            />
            <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
              SIGN UP
            </button>
          </form>
          {sError ? (
            <p className="mt-2 text-red-900 font-bold text-center">
              User already exist.
            </p>
          ) : (
            ""
          )}
          {success ? (
            <p className="text-green-900 font-bold mt-2">
              You successfully created account.
            </p>
          ) : (
            ""
          )}
          <p className="mt-3 text-center">
            You have an account?{" "}
            <span
              className="text-green-900 font-bold cursor-pointer"
              onClick={() => {
                setLError(false);
                setSError(false);
                setSuccess(false);
                setSignUp(false);
                setUsername("");
                setPassword("");
              }}
            >
              Log in!
            </span>
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-5xl text-center font-bold">
            Hello, {loggedUsername}!
          </h1>
          <p className="mt-4 text-center text-2xl font-bold">LET'S PLAY!</p>
          <button
            onClick={() => route.push("/play")}
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            PLAY
          </button>
        </>
      )}
    </div>
  );
};
export default Home;
