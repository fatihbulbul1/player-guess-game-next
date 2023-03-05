import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Guide: NextPage = () => {
  return (
    <>
      <div className="how-to-play container py-4 flex flex-col">
        <h1 className="text-4xl my-12 md:mb-20 font-bold text-center uppercase">
          How To Play
        </h1>
        <div className="text-how-to-play flex flex-col gap-4 font-medium md:text-xl">
          <div className="p1">
            <span className="text-blue-800 font-bold">Player guess</span> is a
            wordle-like player guessing game. To start a game, you should select
            a <span className="underline">league</span> and{" "}
            <span className="underline">difficulty</span>. In terms of market
            value, each league has its own value range and this value range
            determines the difficulty level of the game. You can see ranges
            while choosing the difficulty. Play games and earn points. Easy game
            starts with 100, medium 125 and hard starts with 150 points. Each
            guess decreases by 10 points. You can earn minimum 10 points from
            each game.
          </div>
          <div className="p2 my-2">
            Start the game by guessing a player. You can see your guess'{" "}
            <span className="font-bold">jersey number</span>,{" "}
            <span className="font-bold">age</span>,{" "}
            <span className="font-bold">nationality</span>,{" "}
            <span className="font-bold">team</span> and{" "}
            <span className="font-bold">value</span> attributes. The game will
            help you to improve your guess by colors.
          </div>
          <div className="blue-div flex items-center gap-4">
            <div className="bg-blue-900 font-semibold border w-24 h-20 flex justify-center items-center text-center shrink-0"></div>{" "}
            <div className="blue-text max-w-3xl min-w-sm">
              means <span className="font-bold">your guess</span> is{" "}
              <span className="text-blue-900">greater than</span> the player you
              are searching.
            </div>
          </div>
          <div className="red-div flex items-center gap-4">
            <div className="bg-red-900 font-semibold border w-24 h-20 shrink-0"></div>{" "}
            <div className="red-text max-w-3xl min-w-sm">
              means <span className="font-bold">your guess</span> is{" "}
              <span className="text-red-900">less than</span> the player you are
              searching. At text based fields,{" "}
              <span className="text-red-900">red box</span> indicates your guess
              is <span className="text-red-900">not matching.</span>
            </div>
          </div>
          <div className="orange-div flex items-center gap-4">
            <div className="bg-orange-700 font-semibold border w-24 h-20 shrink-0"></div>
            <div className="orange-text max-w-3xl min-w-sm">
              means <span className="font-bold">your nationality guess</span>{" "}
              <span className="text-orange-500"> is partially matching. </span>
              Target player can have multiple nationalities and your player's
              nationality is one of them, or vice versa.
            </div>
          </div>
          <div className="green-div flex items-center gap-4">
            <div className="bg-green-900 font-semibold border w-24 h-20 shrink-0"></div>{" "}
            <div className="green-text">
              means <span className="font-bold">your guess</span> is{" "}
              <span className="text-green-900">matching</span> the player you
              are searching!
            </div>
          </div>

          <div className="p3 font-bold mt-4">
            Keep guessing and find the player!
          </div>
        </div>
        {/* <div className="intro flex items-center justify-center">
          <div className="row-info gap-5 flex flex-col mb-4">
            <div className="text-div flex justify-center">
              <p className="text-center w-24">Age guessed</p>
              <p className="text-center w-24">Age real</p>
            </div>
            <div className="row-box gap-5 flex mb-4">
              <div className="bg-blue-900 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                25
              </div>
              <div className="bg-gray-400 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                20
              </div>
            </div>
            <div className="row-box gap-5 flex mb-4">
              <div className="bg-red-900 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                18
              </div>
              <div className="bg-gray-400 font-semibold border w-24 h-20 flex justify-center items-center text-center">
                20
              </div>
            </div>
          </div>
          <div className="row-info gap-5 flex mb-4">
            <p className="text-center w-24">Guessed Nation</p>
            <p className="text-center w-24">Real Nation</p>
          </div>
          <div className="row-box gap-5 flex mb-4">
            <div className="bg-orange-700 font-semibold border w-24 h-20 flex justify-center items-center text-center">
              <p>Türkiye</p>
            </div>
            <div className="bg-gray-400 flex-col font-semibold border w-24 h-20 flex justify-center items-center text-center">
              <p>Türkiye</p>
              <p>İsviçre</p>
            </div>
          </div>
          <div className="row-box gap-5 flex mb-4">
            <div className="bg-red-900 font-semibold border w-24 h-20 flex justify-center items-center text-center">
              <p>İtalya</p>
            </div>
            <div className="bg-gray-400 font-semibold border w-24 h-20 flex justify-center items-center text-center">
              <p>Türkiye</p>
            </div>
          </div>
          <div className="positions-div">
            <p className="w-[242px]">
              Available positions: Kaleci, Stoper, Sol Bek, Sağ Bek, Önlibero,
              Merkez Orta Saha, Sol Kanat, Sağ Kanat, On Numara, Forvet Arkası,
              Santrafor
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Guide;
