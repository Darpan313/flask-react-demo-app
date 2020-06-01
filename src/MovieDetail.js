import React from 'react';
export class MovieDetail extends React.Component{
    render() {
        return(
            <div>
                <h2>{this.props.match.params.showId}</h2>
                <h2>{this.props.match.params.title}</h2>
            </div>
        )
      }
}

export default MovieDetail;