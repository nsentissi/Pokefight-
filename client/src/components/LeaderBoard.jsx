import React from "react";
import { useEffect, useState } from "react";
import "./leaderboard.css";
import axiosClient from "../../axiosClient";

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axiosClient.get("/pokemon/leaderboard");

        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-board">
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Pokemon</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.map((entry) => (
              <tr key={entry._id}>
                <td className="gif-name">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${entry.id}.gif`}
                  />
                  {entry.name}
                </td>
                <td>{entry.wins}</td>
                <td>{entry.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
