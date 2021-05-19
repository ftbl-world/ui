import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./Score.scss";

function Live() {
  const [leagues, setState] = useState([]);
  const [isError, setIsError] = useState(false);

  const updateScore = () => {
    fetch('https://floating-crag-91660.herokuapp.com/', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        setIsError(true);
      })
      .then((result) => {
        setState(result);
      });
  };

  const updateDate = () => {
    $(document).ready(function() {
      let date = new Date();
  
      let day: any = date.getDate();
      let month: any = date.getMonth() + 1;
      let year = date.getFullYear();
  
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
  
      let today = year + "-" + month + "-" + day;       
      $("#datepicker").attr("value", today);
    });
  };

  useEffect(() => {
    updateScore();
    setInterval(() => {
      updateScore();
    }, 15000);
    updateDate();
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
          {isError === false &&
          <div className="dateChanger">
            <div className="dateChanger__indicator">
              <div className="dateChanger__indicator__backward"></div>
              <div className="dateChanger__indicator__displayDate"><span><b>Today</b></span></div>
              <div className="dateChanger__indicator__forward"></div>
            </div>
            <div className="dateChanger__picker">
              <input id="datepicker" type="date"></input>
            </div>
          </div>
          }
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
