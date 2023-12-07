import React from 'react';
import { useEffect, useState } from "react";
import "./leaderboard.css"


const LeaderBoard = () => {
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
          try {
            const response = await fetch('http://localhost:3001/pokemon/leaderboard');
            if (response.ok) {
              const data = await response.json();
              setLeaderboardData(data);
            } else {
              console.error('Failed to fetch leaderboard:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error fetching leaderboard:', error);
          }
        };
    
        fetchLeaderboard();
      }, []); 

      return (
        <div className='leaderboard'>
          <h2>Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Wins</th>
                <th>Losses</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData?.map((entry) => (
                <tr key={entry._id}>
                  <td>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${entry.id}.gif`}  />
                  {entry.name}
                  </td>
                  <td>{entry.wins}</td>
                  <td>{entry.losses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

export default LeaderBoard