import { GetServerSideProps, NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/AppContext";
interface User {
  _id: string;
  name: string;
  points: number;
}
interface Props {
  users: User[];
}
const Leadboard: NextPage<Props> = ({ users }) => {
  const { loggedUsername, setLoggedUsername } = useContext(AppContext);
  const [n, setN] = useState(0);
  const [point, setPoint] = useState<number>();
  useEffect(() => {
    let n = 0;
    users.forEach((item) => {
      n++;
      if (item.name === loggedUsername) {
        setN(n);
        setPoint(item.points);
      }
    });
  }, []);
  return (
    <div className="leadboard h-full py-10 flex flex-col items-start w-full px-10">
      <h1 className="text-blue-800 text-4xl mb-5 font-bold border-b-2 border-blue-800">
        Leadboard
      </h1>
      {users.map((user, i) => {
        return (
          <div
            key={i}
            className="user-l text-2xl font-bold items-center flex gap-5"
          >
            <p className="text-red-700 font-bold">
              {i + 1}
              {")"}
            </p>
            <p>{user.name}:</p>
            <p>{user.points} points</p>
          </div>
        );
      })}
      {loggedUsername !== "" ? (
        <div
          key={"own"}
          className="user-own border-t-2 border-red-600 mt-5 items-center flex gap-5"
        >
          <p className="text-bold text-xl font-bold">{`Your place: ${n}) ${loggedUsername} : ${point} points`}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(
    "https://player-guess-game-next.vercel.app/api/users"
  );
  const users = await res.json();
  return { props: { users } };
};
export default Leadboard;
