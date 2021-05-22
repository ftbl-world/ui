import React, { useState, useEffect } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import $ from "jquery";
import "./Score.scss";

function Live() {
  const [leagues, setLeagues] = useState([]);
  const [activeLeague, setActiveLeague] = useState('AllLeagues');
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
      setLeagues(result);
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

  const handleActiveLeagueChange = (e: any) => {
    setActiveLeague(e.target.value);
    localStorage.setItem('ftbl-selected-league', e.target.value);
  };

  const convertTime12to24 = (time12h: string) => {
    const [time, modifier] = time12h.split(" ");
    let hours: any = time.split(":")[0];
    let minutes: any = time.split(":")[1];
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    var sSelectedLeague: string = localStorage.getItem('ftbl-selected-league') || 'AllLeagues';
    setActiveLeague(sSelectedLeague);
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
            <div className="league__selector">
              <Select id="leagueSelect" value={activeLeague} onChange={(e: any) => handleActiveLeagueChange(e)}>
                <MenuItem value="AllLeagues">All Leagues</MenuItem>
                {isError === false && leagues.map((item: any, index: any) => {
                  return (
                    <MenuItem value={item.leagueID} >{item.name}</MenuItem>
                  )
                })}
              </Select>
            </div>
          }
          {isError === false && leagues.filter((item: any) => {
            if (activeLeague === "AllLeagues") {
              return item;
            } else {
              return item.leagueID === activeLeague;
            }
          }).map((item: any, index: any) => {
            return (
              <div id={item.leagueID} key={item.leagueID} className="liveContainer__body__leagueContainer">
                <div className="leagueNameContainer"><span className="leagueName">{item.name}</span></div>
                <table>
                  <tbody>
                    {item.matches.length > 0 && item.matches.map((match: any) => {
                      return (
                        <tr key={match.matchID}>
                          <td className="liveScore__homeTeam">
                            {/* <div className="home__name__logo"> */}
                              <span className="homeTeam">{match.homeTeam}</span>
                              {/* <img src="https://secure.cache.images.core.optasports.com/soccer/teams/75x75/uuid_4grc9qgcvusllap8h5j6gc5h5.png" width="20" height="20" alt=""></img> */}
                            {/* </div> */}
                          </td>
                          <td className="liveScore">
                            <div className="liveScoreContainer">
                              {match.time.state !== undefined && <span className="state"><b>{match.time.state}</b></span>}
                                {
                                  match.time.state === undefined ?
                                    <span className="score"><b>&nbsp;&nbsp;&nbsp;{convertTime12to24(match.time.status.substring(match.time.status.lastIndexOf("(") + 1, match.time.status.lastIndexOf("M") + 1))}&nbsp;&nbsp;&nbsp;</b></span>
                                    :
                                    <span className="score"><b>&nbsp;&nbsp;&nbsp;{match.homeScore} - {match.awayScore}&nbsp;&nbsp;&nbsp;</b></span>
                                }
                            </div>
                          </td>
                          <td className="liveScore__awayTeam">
                            {/* <div className="away__name__logo"> */}
                              {/* <img src="https://secure.cache.images.core.optasports.com/soccer/teams/75x75/uuid_4grc9qgcvusllap8h5j6gc5h5.png" width="20" height="20" alt=""></img> */}
                              <span className="awayTeam">{match.awayTeam}</span>
                            {/* </div> */}
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
      </div>
    </div>
  );
}

export default Live;
