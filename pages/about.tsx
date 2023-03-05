import Link from "next/link";
import React from "react";

const about = () => {
  return (
    <div className="text-lg flex flex-col gap-5 font-semibold about">
      <h1 className="text-4xl font-bold uppercase text-blue-400">About</h1>
      <div className="text">
        <p>
          This project and APIs are made by{" "}
          <Link
            className="underline text-red-600"
            target={"_blank"}
            href="https://github.com/fatihbulbul1"
          >
            fatihbulbul91
          </Link>
          , and all of them are open source.
        </p>
        <p>You can contact me:</p>
        <p>
          Mail:{" "}
          <Link
            className="hover:underline text-teal-400"
            href={"mailto:fatihbulbul12@gmail.com"}
          >
            fatihbulbul12@gmail.com
          </Link>
        </p>
        <p>
          Github:{" "}
          <Link
            className="hover:underline text-teal-400"
            target={"_blank"}
            href={"https://github.com/fatihbulbul1"}
          >
            https://github.com/fatihbulbul1
          </Link>
        </p>
        <p>
          LinkedIn:{" "}
          <Link
            className="hover:underline text-teal-400"
            target={"_blank"}
            href={
              "https://www.linkedin.com/in/%C3%B6mer-fatih-b%C3%BClb%C3%BCl-74a890236/"
            }
          >
            Ömer Fatih Bülbül
          </Link>
        </p>
        <p className="text-center mt-5">2023 - {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default about;
