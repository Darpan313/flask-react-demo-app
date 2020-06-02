import React from 'react';
import './MovieDetail.css';
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
            //  console.log(data)
              this.setState({ movie_details: data })
          } );
      }
    
    render() {
        let movie = this.state.movie_details[0];
        return(
            <div>
            {
                movie &&
                <div align="center" >
                  <table  align="center">
                    <th  colSpan="2">
                      <h3 align="center">Movie Details</h3>
                      
                      </th>
                      
                      
                      <tr>
                      <td>Titile:</td>
                      <td>{movie.title}</td>
                    </tr>
                    <tr>
                      <td>Type:</td>
                      <td>{movie.type}</td>
                    </tr>
                    <tr>
                      <td>Release year:</td>
                      <td>{movie.release_year}</td>
                    </tr>
                    <tr>
                      <td>Description:</td>
                      <td>{movie.description}</td>
                    </tr>
                    <tr>
                      <td>Show Id:</td>
                      <td>{movie.show_id}</td>
                    </tr>
                    

                  </table>
                </div>
            }
                
            </div>
        )
      }
}

export default MovieDetail;