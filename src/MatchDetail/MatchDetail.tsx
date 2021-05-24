import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import "./MatchDetail.scss";

function MatchDetail(props: any) {
    return (
        <>
            <Dialog open={props.dialogOpen} onClose={props.handleMatchDetailDialogClose} fullWidth maxWidth="md">
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
                    <div className="matchDetail__scorers">

                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default MatchDetail;
