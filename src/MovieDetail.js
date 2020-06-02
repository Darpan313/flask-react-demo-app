import React from 'react';
export class MovieDetail extends React.Component{
   
    constructor(props) {
        super(props);
     
        this.state = {
          movie_details: [],
        };
      }
     
      componentDidMount() {
        fetch(`https://api-tutorial4.herokuapp.com/movies?show_id=${this.props.match.params.showId}`)
          .then(response => response.json())
          .then((data) =>{
              this.setState({ movie_details: data })
          } );
      }
    
    render() {
        let movie = this.state.movie_details[0];
        return(
            <div>
            {
                movie &&
                <div>
                <h2>Movie Details</h2>
                <h2>Title: {movie.title}</h2>
                <h2>Type: {movie.type}</h2>
                <h2>Release year: {movie.release_year}</h2>
                <h2>Description: {movie.description}</h2>
                <h2>Show Id: {movie.show_id}</h2>
                </div>
            }
                
            </div>
        )
      }
}

export default MovieDetail;