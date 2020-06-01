import React from 'react';
export class MovieDetail extends React.Component{
    render() {
        return(
            <h2>{this.props.match.params.showId}</h2>
          
        )
      }
}

export default MovieDetail;