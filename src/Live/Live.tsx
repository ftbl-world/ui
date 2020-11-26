import React, { useState, useEffect } from "react";
import "./Live.scss";

function Live() {
  const [leagues, setState] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInterval(() => {
      fetch("https://api.ftbl.world/", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .catch(error => {
          setIsError(true);
        })
        .then((result) => {
          setState(result);
          console.log(result);
        });
    }, 1000);
  }, []);

  return (
    <div className="liveContainer">
      <div className="liveContainer__header">
        <div className="liveContainer__header__content">
          <span className="live__dot"></span>
          <span className="live__title">Live Scores</span>
        </div>
      </div>
      <div className="liveContainer__body">
        <div className="liveContainer__body__scores">
          {isError === true && <div className="errorPage"><span>Cannot fetch the data right now.</span></div>}
          {isError === false && leagues.map((item: any, index: any) => {
            return (
              <div key={item.leagueID} className="liveContainer__body__leagueContainer">
                <div className="leagueNameContainer"><span className="leagueName">{item.name}</span></div>
                <table>
                  <tbody>
                    {item.matches.length > 0 && item.matches.map((match: any) => {
                      return (
                        <tr key={match.matchID}>
                          <td>
                            <div className="liveScore">
                              <span className="state"><b>{match.time.state}</b></span>
                              <span className="homeTeam">{match.homeTeam}</span>
                              <span className="score"><b>&nbsp;&nbsp;&nbsp;{match.homeScore} - {match.awayScore}&nbsp;&nbsp;&nbsp;</b></span>
                              <span className="awayTeam">{match.awayTeam}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {item.matches.length === 0 && <tr><td><div className="noGames"><span><b>No scheduled matches today.</b></span></div></td></tr>}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
        <div className="liveContainer__body__leagueNavigator">
          <nav>
            {isError === false && leagues.map((item: any, index: any) => {
              return (
                <a key={item.leagueID + "_sideNav"} href={index}>{item.name}</a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Live;
