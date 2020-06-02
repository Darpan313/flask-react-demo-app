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
                <table class="table">
                  <thead>
                  <tr>
                  <th colspan="2"> Movie Details</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Title</td>
                      <td>{movie.title}</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>{movie.type}</td>
                    </tr>
                    <tr>
                      <td>Release year</td>
                      <td>{movie.release_year}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>{movie.description}</td>
                    </tr>
                    <tr>
                      <td>Show Id</td>
                      <td>{movie.show_id}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
            }
                
            </div>
        )
      }
}

export default MovieDetail;