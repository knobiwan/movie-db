import * as React from "react";

const MovieRate = (props: any) => {

    const color = props.vote_average >= 8
        ? "green"
        : props.vote_average >= 5
        ? "orange"
        : "red";

    return (
        <>
            {!props.minimum && (
            <div>
                <span className={`vote-average ${color}`}>{props.vote_average}</span>
                <span> / 10</span>
            </div>
            )}
            {props.minimum && (
                <span className={`vote-average ${color} minimum`}>{props.vote_average}</span>
            )}
        </>
    )
}

export default MovieRate;