import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import "./MatchDetail.scss";
import { MatchDetails, initialMatchDetails } from '../types';

function MatchDetail(props: any) {

  const getPercentage = (home: string, away: string) => {
    const h = parseInt(home);
    const a = parseInt(away);
    if (a === 0 && h === 0) {
      return '50%';
    }
    return `${100 * (h / (h + a))}%`;
  };

    const [matchDetails, setMatchDetails] = useState<MatchDetails>(initialMatchDetails);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchMatchDetails = () => {
        fetch(`https://floating-crag-91660.herokuapp.com/details?matchUrl=${props.dialogState.detailsUrl}`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then((res) => res.json())
        .catch((error) => {
            setIsDataLoaded(false);
        })
        .then((result) => {
            setIsDataLoaded(true);
            setMatchDetails(result);
        });
    }

    useEffect(() => {
        if (props.dialogOpen) {
            fetchMatchDetails();
            const refreshInterval = setInterval(() => {
                fetchMatchDetails();
            }, 15000);
            return () => {
                setIsDataLoaded(false);
                return clearInterval(refreshInterval);
            };
        }
    }, [props.dialogOpen, props.dialogState.detailsUrl]);
    
    return (
        <>
            {<Dialog open={props.dialogOpen} onClose={props.handleMatchDetailDialogClose} fullWidth maxWidth="md">
                <div className="matchDetail">
                  <div className="matchDetail__stats">
                        <div className="matchDetail__stats__homeTeam">
                            <div className="matchDetail__stats__homeTeam__logo">
                                <img src={props.dialogState.homeTeamLogoUrl} width="50" height="50" alt=""></img>
                            </div>
                            <div className="matchDetail__stats__homeTeam__name">
                                <span>{props.dialogState.homeTeam}</span>
                            </div>
                        </div>
                        <div className="matchDetail__stats__score">
                            <div className="matchDetail__stats__score__scores">
                                <h2>{props.dialogState.homeScore}</h2>
                                <h2>-</h2>
                                <h2>{props.dialogState.awayScore}</h2>
                            </div>
                            {
                              props.dialogState.homePenaltyScore && props.dialogState.awayPenaltyScore &&
                                <div className="matchDetail__stats__score__scores">
                                  ({props.dialogState.homePenaltyScore} - {props.dialogState.awayPenaltyScore})
                                </div>
                            }
                            <div className="matchDetail__stats__score__status">
                                {props.dialogState.time && <span>{props.dialogState.time.state}</span>}
                            </div>
                        </div>
                        <div className="matchDetail__stats__awayTeam">
                            <div className="matchDetail__stats__awayTeam__logo">
                                <img src={props.dialogState.awayTeamLogoUrl} width="50" height="50" alt=""></img>
                            </div>
                            <div className="matchDetail__stats__awayTeam__name">
                                <span>{props.dialogState.awayTeam}</span>
                            </div>
                        </div>
                    </div>
                    {isDataLoaded === true && <>
                        <div className="matchDetail__scorers">
                            <div className="matchDetail__scorers__home">
                                {matchDetails.home.goals && matchDetails.home.goals.map((item: any, index: any) => 
                                    <span>{item.scorer} &nbsp;&nbsp;&nbsp; {item.time}' &nbsp;</span>
                                )}
                            </div>
                            <div className="matchDetail__scorers__logo">
                                <SportsSoccerIcon />
                            </div>
                            <div className="matchDetail__scorers__away">
                                {matchDetails.away.goals && matchDetails.away.goals.map((item: any, index: any) => 
                                    <span>&nbsp; {item.scorer} &nbsp;&nbsp;&nbsp; {item.time}'</span>
                                )}
                            </div>
                        </div>
                    <div className="matchDetail__charts">
                      {matchDetails.charts.possessionChart && <>
                        <div className="matchDetail__charts__possession">
                          <span className="chart-title">Possession</span>
                          <div className="matchDetail__charts__possession__chart">
                            <span className="datapoint-label">{matchDetails.home.possession}</span>
                            <div className="matchDetail__charts__possession__chart__svg-container" dangerouslySetInnerHTML={{__html: matchDetails.charts.possessionChart}}></div>
                            <span className="datapoint-label">{matchDetails.away.possession}</span>
                          </div>
                        </div>
                      <div className="matchDetail__charts__ontarget">
                      <span className="chart-title">Shots On Target</span>
                        <div className="matchDetail__charts__datapoints">
                          <span className="datapoint-label">{matchDetails.home.shots.onTarget}</span>
                          <span className="datapoint-label">{matchDetails.away.shots.onTarget}</span>
                        </div>
                        <div className="background-bar">
                          <div className="foreground-bar" style={{ width: getPercentage(matchDetails.home.shots.onTarget, matchDetails.away.shots.onTarget) }}></div>
                        </div>
                      </div>
                      <div className="matchDetail__charts__offtarget">
                        <span className="chart-title">Shots Off Target</span>
                        <div className="matchDetail__charts__datapoints">
                          <span className="datapoint-label">{matchDetails.home.shots.offTarget}</span>
                          <span className="datapoint-label">{matchDetails.away.shots.offTarget}</span>
                        </div>
                        <div className="background-bar">
                          <div className="foreground-bar" style={{ width: getPercentage(matchDetails.home.shots.offTarget, matchDetails.away.shots.offTarget) }}></div>
                        </div>
                      </div>
                      <div className="matchDetail__charts__passes">
                        <span className="chart-title">Passes</span> 
                        <div className="matchDetail__charts__datapoints">
                          <span className="datapoint-label">{matchDetails.home.totalPasses}</span>
                          <span className="datapoint-label">{matchDetails.away.totalPasses}</span>
                        </div>
                        <div className="background-bar">
                          <div className="foreground-bar" style={{ width: getPercentage(matchDetails.home.totalPasses, matchDetails.away.totalPasses) }}></div>
                        </div>
                      </div>
                    </> }
                    </div>
                    </>
            }
                </div>
            </Dialog>}
        </>
    );
}

export default MatchDetail;
