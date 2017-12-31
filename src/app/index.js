import _ from "lodash";
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/Search_Bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/Video_List';
import VideoDetails from './components/Video_Details';

const API_KEY = "AIzaSyC9nmSal4o8wb9c4Y-Mz1flRB3HA477a5E";

class App extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            videos:[],
            selectedVideo:null
        };
        this.videoSearch('surfboards')
    }
    videoSearch(term)
    {
        YTSearch({key:API_KEY, term:term},
        (videos)=>this.setState({videos:videos,
            selectedVideo:videos[0]
        }));
        
    }
    render()
    {
        const videoSearch = _.debounce(term => {
          this.videoSearch(term);
        }, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetails video={this.state.selectedVideo}/>
                <VideoList
                onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
                videos={this.state.videos}/>
            </div>
            
        );
    }
}

ReactDOM.render(<App />,document.querySelector('.container'));