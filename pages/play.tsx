import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Player } from "../types/Player";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ScrollToBottom from "react-scroll-to-bottom";
import Leagues from "../components/Exports/Leagues";
import { AppContext } from "../utils/AppContext";
import { useRouter } from "next/router";
import Head from "next/head";
const Play: NextPage = () => {
  const router = useRouter();
  const [points, setPoints] = useState(100);
  const { loggedUsername, setLoggedUsername } = useContext(AppContext);
  const [mode, setMode] = useState<number>(0);
  useEffect(() => {
    if (loggedUsername === "") {
      router.push("/");
      return;
    }
    setAllPlayers(Leagues[mode].league);
    setFilter(Leagues[mode].values[0]);
    const newFilter = Leagues[mode].league!.filter((player) => {
      return compareValues(player.pd, Leagues[mode].values[0]) === "high";
    });
    setFilteredPlayers(newFilter);
    setPlayerToGuess(newFilter[getRandomInt(newFilter.length)]);
  }, [mode]);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  function arraysEqual(a: string[], b: string[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  function compareValues(a: string, b: string) {
    const aSplit = a.split(" ");
    const bSplit = b.split(" ");
    const aType = aSplit[1];
    const bType = bSplit[1];
    let aMultiplier;
    let bMultiplier;
    aType === "mil." ? (aMultiplier = 1000000) : (aMultiplier = 1000);
    bType === "mil." ? (bMultiplier = 1000000) : (bMultiplier = 1000);
    const aPrice = parseFloat(aSplit[0]) * aMultiplier;
    const bPrice = parseFloat(bSplit[0]) * bMultiplier;

    if (aPrice === bPrice) return "equal";
    else if (aPrice > bPrice) return "high";
    else return "low";
  }
  const [difficultyName, setDifficultyName] = useState<
    "Easy" | "Medium" | "Hard"
  >("Easy");

  const [filter, setFilter] = useState("6.99 mil. €");
  const [photos, setPhotos] = useState([
    Leagues[mode].photos.Easy1,
    Leagues[mode].photos.Easy2,
    Leagues[mode].photos.Easy3,
  ]);
  const [difficulty, setDifficulty] = useState(true);
  const [playerToGuess, setPlayerToGuess] = useState<Player>();
  const [allPlayers, setAllPlayers] = useState<Array<Player>>();
  const [search, setSearch] = useState<Player | null>();
  const [displaySearch, setDisplaySearch] = useState<Player[]>([]);
  const [temp, setTemp] = useState<Player | undefined>(undefined);
  const [filteredPlayers, setFilteredPlayers] = useState<Array<Player>>();
  const [gameOver, setGameOver] = useState(false);
  const handleGameOver = () => {
    fetch("https://main--benevolent-longma-c3cf58.netlify.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: loggedUsername,
        type: "P",
        points: points,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const handleRestart = () => {
    setPlayerToGuess(filteredPlayers![getRandomInt(filteredPlayers!.length)]);
    let num;
    if (difficultyName === "Easy") num = 100;
    else if (difficultyName === "Medium") {
      num = 125;
    } else num = 150;
    setPoints(num);
    setDisplaySearch([]);
    setGameOver(false);
  };
  const handleMainMenu = () => {
    setDifficulty(true);
    setMode(0);
    let num;
    if (difficultyName === "Easy") num = 100;
    else if (difficultyName === "Medium") {
      num = 125;
    } else num = 150;
    setPoints(num);
    setDisplaySearch([]);
    setPhotos([
      Leagues[0].photos.Easy1,
      Leagues[0].photos.Easy2,
      Leagues[0].photos.Easy3,
    ]);
    setGameOver(false);
  };
  const handleSearch = (event: any, value: Player | null) => {
    setSearch(value);
    const newSearches: Player[] | undefined = [...displaySearch!];
    newSearches.push(value!);
    setDisplaySearch(newSearches);
    if (value == playerToGuess) {
      setGameOver(true);
      handleGameOver();
    } else {
      if (points > 10) setPoints(points - 10);
    }
  };

  return (
    <>
      {loggedUsername !== "" && difficulty ? (
        <div className="flex gap-16 h-full w-full flex-col items-center">
          <div className="mt-6 select-mode flex flex-col gap-5">
            <h1 className="font-bold text-center uppercase md:text-5xl text-xl text-green-500">
              Select League
            </h1>
            <div className="flags flex gap-8 justify-center">
              <div className="relative">
                <Image
                  onClick={() => {
                    setDifficultyName("Easy");
                    setMode(0);
                    setPhotos([
                      Leagues[0].photos.Easy1,
                      Leagues[0].photos.Easy2,
                      Leagues[0].photos.Easy3,
                    ]);
                  }}
                  className={`hover:border-blue-400 transition-all cursor-pointer w-20 rounded-full border-4 ${
                    mode === 0 ? "border-green-700" : ""
                  }`}
                  alt=""
                  src="https://hatscripts.github.io/circle-flags/flags/tr.svg"
                  width={80}
                  height={80}
                ></Image>
              </div>
              <div className="relative">
                <Image
                  onClick={() => {
                    setDifficultyName("Easy");
                    setMode(1);
                    setPhotos([
                      Leagues[1].photos.Easy1,
                      Leagues[1].photos.Easy2,
                      Leagues[1].photos.Easy3,
                    ]);
                  }}
                  className={`hover:border-blue-400 transition-all cursor-pointer w-20 rounded-full border-4 ${
                    mode === 1 ? "border-green-700" : ""
                  }`}
                  alt=""
                  src="https://hatscripts.github.io/circle-flags/flags/gb-eng.svg"
                  width={80}
                  height={80}
                ></Image>
                <div className="hidden md:flex uppercase bg-blue-400 p-1 transform rotate-30 font-bold rounded-lg new absolute -top-3 -right-2">
                  new!
                </div>
              </div>
              <div className="relative">
                <Image
                  onClick={() => {
                    setDifficultyName("Easy");
                    setMode(2);
                    setPhotos([
                      Leagues[2].photos.Easy1,
                      Leagues[2].photos.Easy2,
                      Leagues[2].photos.Easy3,
                    ]);
                  }}
                  className={`hover:border-blue-400 transition-all cursor-pointer w-20 rounded-full border-4 ${
                    mode === 2 ? "border-green-700" : ""
                  }`}
                  alt=""
                  src="https://hatscripts.github.io/circle-flags/flags/es.svg"
                  width={80}
                  height={80}
                ></Image>
                <div className="hidden md:flex uppercase bg-blue-400 p-1 transform rotate-30 font-bold rounded-lg new absolute -top-3 -right-2">
                  new!
                </div>
              </div>
              <div className="relative">
                <Image
                  onClick={() => {
                    setDifficultyName("Easy");
                    setMode(3);
                    setPhotos([
                      Leagues[3].photos.Easy1,
                      Leagues[3].photos.Easy2,
                      Leagues[3].photos.Easy3,
                    ]);
                  }}
                  className={`hover:border-blue-400 transition-all cursor-pointer w-20 rounded-full border-4 ${
                    mode === 3 ? "border-green-700" : ""
                  }`}
                  alt=""
                  src="https://hatscripts.github.io/circle-flags/flags/it.svg"
                  width={80}
                  height={80}
                ></Image>
                <div className="hidden md:flex uppercase bg-blue-400 p-1 transform rotate-30 font-bold rounded-lg new absolute -top-3 -right-2">
                  new!
                </div>
              </div>
              <div className="relative">
                <Image
                  onClick={() => {
                    setDifficultyName("Easy");
                    setMode(4);
                    setPhotos([
                      Leagues[4].photos.Easy1,
                      Leagues[4].photos.Easy2,
                      Leagues[4].photos.Easy3,
                    ]);
                  }}
                  className={`hover:border-blue-400 transition-all cursor-pointer w-20 rounded-full border-4 ${
                    mode === 4 ? "border-green-700" : ""
                  }`}
                  alt=""
                  src="https://hatscripts.github.io/circle-flags/flags/fr.svg"
                  width={80}
                  height={80}
                ></Image>
                <div className="hidden md:flex uppercase bg-blue-400 p-1 transform rotate-30 font-bold rounded-lg new absolute -top-3 -right-2">
                  new!
                </div>
              </div>
              <div className="relative">
                <Image
                  onClick={() => {
                    setDifficultyName("Easy");
                    setMode(5);
                    setPhotos([
                      Leagues[5].photos.Easy1,
                      Leagues[5].photos.Easy2,
                      Leagues[5].photos.Easy3,
                    ]);
                  }}
                  className={`hover:border-blue-400 transition-all cursor-pointer w-20 rounded-full border-4 ${
                    mode === 5 ? "border-green-700" : ""
                  }`}
                  alt=""
                  src="https://hatscripts.github.io/circle-flags/flags/de.svg"
                  width={80}
                  height={80}
                ></Image>
                <div className="hidden md:flex uppercase bg-blue-400 p-1 transform rotate-30 font-bold rounded-lg new absolute -top-3 -right-2">
                  new!
                </div>
              </div>
            </div>
          </div>
          <div className="photos md:gap-m3 gap-4 min-h-[193px] items-center justify-center flex flex-col md:flex-row">
            <Image
              className="md:w-72 w-48 rounded-xl md:-mr-4 md:transform md:animate-photoleft md:-rotate-15"
              alt=""
              src={photos[0]}
            ></Image>
            <Image
              className="z-30 md:transform md:w-72 w-48 rounded-xl "
              alt=""
              src={photos[1]}
            ></Image>
            <Image
              className="md:w-72 w-48 rounded-xl md:-ml-4 md:transform md:animate-photoright md:rotate-15"
              alt=""
              src={photos[2]}
            ></Image>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="difficulty flex flex-col justify-center items-center gap-5">
              <h1 className="font-bold uppercase text-4xl text-center">
                select difficulty
              </h1>
              <div className="dif-btns gap-5 flex">
                <button
                  onClick={() => {
                    setFilter(Leagues[mode].values[0]);
                    const newFilter = Leagues[mode].league!.filter((player) => {
                      return (
                        compareValues(player.pd, Leagues[mode].values[0]) ===
                        "high"
                      );
                    });
                    setDifficultyName("Easy");
                    setPoints(100);
                    setPhotos([
                      Leagues[mode].photos.Easy1,
                      Leagues[mode].photos.Easy2,
                      Leagues[mode].photos.Easy3,
                    ]);
                    setFilteredPlayers(newFilter);
                    setPlayerToGuess(newFilter[getRandomInt(newFilter.length)]);
                  }}
                  className={`${
                    difficultyName === "Easy"
                      ? "border-green-400"
                      : "border-transparent"
                  } border-4 md:px-6 md:py-3 font-bold md:text-lg px-2 py-1 text-black bg-green-500 hover:bg-green-600 transition rounded-full shadow-2xl easy`}
                >
                  Easy
                </button>
                <button
                  onClick={() => {
                    setFilter(Leagues[mode].values[1]);
                    const newFilter = Leagues[mode].league!.filter((player) => {
                      return (
                        compareValues(player.pd, Leagues[mode].values[1]) ===
                        "high"
                      );
                    });
                    setDifficultyName("Medium");
                    setPoints(125);
                    setPhotos([
                      Leagues[mode].photos.Med1,
                      Leagues[mode].photos.Med2,
                      Leagues[mode].photos.Med3,
                    ]);
                    setFilteredPlayers(newFilter);
                    setPlayerToGuess(newFilter[getRandomInt(newFilter.length)]);
                  }}
                  className={`${
                    difficultyName === "Medium"
                      ? "border-green-400"
                      : "border-transparent"
                  } border-4 md:px-6 md:py-3 font-bold md:text-lg text-black px-2 py-1 bg-yellow-500 hover:bg-yellow-600 transition rounded-full shadow-2xl medium`}
                >
                  Medium
                </button>
                <button
                  onClick={() => {
                    setFilter(Leagues[mode].values[2]);
                    const newFilter = Leagues[mode].league!.filter((player) => {
                      return (
                        compareValues(player.pd, Leagues[mode].values[2]) ===
                        "high"
                      );
                    });
                    setDifficultyName("Hard");
                    setPoints(150);
                    setPhotos([
                      Leagues[mode].photos.Hard1,
                      Leagues[mode].photos.Hard2,
                      Leagues[mode].photos.Hard3,
                    ]);
                    setFilteredPlayers(newFilter);
                    setPlayerToGuess(newFilter[getRandomInt(newFilter.length)]);
                  }}
                  className={`${
                    difficultyName === "Hard"
                      ? "border-green-400"
                      : "border-transparent"
                  } border-4 md:px-6 md:py-3 font-bold md:text-lg text-black px-2 py-1 bg-red-700 hover:bg-red-800 transition rounded-full shadow-2xl hard`}
                >
                  Hard
                </button>
              </div>
              <div className="info-text">
                <p
                  className={`${
                    difficultyName === "Easy"
                      ? "text-green-500"
                      : difficultyName === "Medium"
                      ? "text-yellow-500"
                      : "text-red-900"
                  } font-bold md:text-2xl`}
                >
                  Players with {parseFloat(filter.split(" ")[0]) + 0.01}+ mil. €
                  values
                </p>
              </div>
            </div>
            <button
              className="bg-blue-700 p-4 rounded-md hover:underline hover:bg-blue-900 transition uppercase font-bold "
              onClick={() => setDifficulty(false)}
            >
              start!
            </button>
            {/* <h3>
              Easy:{" "}
              {mode === "STSL" ? "Value = 7+ mil. €" : "Value = 40+ mil. €"}
            </h3>
            <h3>
              Medium:{" "}
              {mode === "STSL" ? "Value = 3+ mil. €" : "Value = 15+ mil. €"}
            </h3>
            <h3>
              Hard:{" "}
              {mode === "STSL" ? "Value = 1+ mil. €" : "Value = 10+ mil. €"}
            </h3> */}
          </div>
        </div>
      ) : loggedUsername !== "" ? (
        <>
          {gameOver ? (
            <div>
              <div className="items-center justify-center left-0 top-0 flex absolute game-over w-full h-screen z-40 bg-gray-700 opacity-80"></div>
              <div
                style={{
                  top: "calc(50% -9rem)",
                  left: "calc(50% - 9rem)",
                }}
                className="flex flex-col justify-center gap-6 text-center skew-x-2hadow-xl absolute opacity-100 game-over-box z-50 w-72 h-72 bg-blue-400 rounded-md"
              >
                <p className=" text-2xl font-bold">Game over!</p>
                <p
                  className="text-red-800 text-3xl font-bold
                "
                >
                  Score: {points}
                </p>
                <div className="btns">
                  <button
                    onClick={() => handleRestart()}
                    className="border border-amber-600 bg-amber-600 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  >
                    Restart
                  </button>
                  <button
                    onClick={handleMainMenu}
                    className="border border-emerald-800  bg-emerald-800 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline"
                  >
                    Main Menu
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <p className="text-3xl font-bold">POINTS: {points}</p>
          <p className="text-red-900 font-bold text-center sm:hidden block">
            It is highly recommended to play in "Desktop View" mode in your
            mobile browser.
          </p>
          <Autocomplete
            className="mt-6"
            disabled={gameOver}
            disablePortal
            id="combo-box-demo"
            options={filteredPlayers!}
            disableClearable={true}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Players" />}
            onChange={handleSearch}
            blurOnSelect={true}
            isOptionEqualToValue={(option, value) => true}
            value={temp}
          />
          <div className="categories max-w-full w-[930px] mr-7 flex gap-6 justify-around">
            <p className="w-28 text-center">Number</p>
            <p className=" w-28 text-center">Player Name</p>
            <p className=" w-28 text-center">Position</p>
            <p className="w-28  text-center">Age</p>
            <p className="w-28 text-center">Nationality</p>
            <p className="w-28 text-center">Team</p>
            <p className="w-28 text-center">Value</p>
          </div>
          <ScrollToBottom className="max-w-full">
            <div className="players w-[930px] mr-7 max-h-[500px] flex flex-col gap-6">
              {displaySearch.map((search) => {
                return (
                  <>
                    <div className="player w-full flex gap-6 justify-around items-center">
                      <div
                        className={`${
                          parseInt(search.number) <
                          parseInt(playerToGuess!.number)
                            ? "bg-red-900"
                            : parseInt(search.number) ===
                              parseInt(playerToGuess!.number)
                            ? "bg-green-900"
                            : "bg-blue-900"
                        } font-semibold border min-w-[7rem] h-20 flex justify-center items-center`}
                      >
                        {search?.number}
                      </div>
                      <div
                        className={`${
                          search.name !== playerToGuess!.name
                            ? "bg-red-900"
                            : "bg-green-900"
                        } font-semibold border min-w-[7rem] h-20 flex justify-center items-center`}
                      >
                        <p className="max-w-min text-center">{search?.name}</p>
                      </div>
                      <div
                        className={`${
                          search.position !== playerToGuess!.position
                            ? "bg-red-900"
                            : "bg-green-900"
                        } font-semibold border min-w-[7rem] h-20 flex justify-center items-center text-center`}
                      >
                        {search?.position}
                      </div>
                      <div
                        className={`${
                          parseInt(search.age) < parseInt(playerToGuess!.age)
                            ? "bg-red-900"
                            : parseInt(search.age) ===
                              parseInt(playerToGuess!.age)
                            ? "bg-green-900"
                            : "bg-blue-900"
                        } font-semibold border min-w-[7rem] h-20 flex justify-center items-center `}
                      >
                        {search?.age}
                      </div>
                      <div
                        className={`${
                          arraysEqual(search.nations, playerToGuess!.nations)
                            ? "bg-green-900"
                            : search.nations.every((val) =>
                                playerToGuess!.nations.includes(val)
                              ) ||
                              playerToGuess!.nations.every((val) =>
                                search!.nations.includes(val)
                              )
                            ? "bg-orange-700"
                            : "bg-red-900"
                        } font-semibold text-center border min-w-[7rem] h-20 flex flex-col justify-center items-center nations`}
                      >
                        {search?.nations.map((nation) => {
                          return <p>{nation}</p>;
                        })}
                      </div>
                      <div
                        className={`${
                          search.team !== playerToGuess!.team
                            ? "bg-red-900"
                            : "bg-green-900"
                        } font-semibold border min-w-[7rem] h-20 flex justify-center items-center text-center`}
                      >
                        {search?.team}
                      </div>
                      <div
                        className={`${
                          compareValues(search.pd, playerToGuess!.pd) === "high"
                            ? "bg-blue-800"
                            : compareValues(search.pd, playerToGuess!.pd) ===
                              "equal"
                            ? "bg-green-900"
                            : "bg-red-900"
                        } text-center font-semibold border min-w-[7rem] h-20 flex justify-center items-center`}
                      >
                        {search?.pd}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </ScrollToBottom>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Play;
