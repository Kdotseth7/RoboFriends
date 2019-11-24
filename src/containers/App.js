import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''  
        }
        console.log('constructor');
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users') // fetch() is a window object
        .then( response => response.json())
        .then( users => this.setState( { robots: users }));
    }

    onSearchChange = event => { 
        this.setState({ searchField: event.target.value });
    }

    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter( robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        console.log('render');
        return !robots.length ? <h1 className = 'tc'>Loading</h1>:(
            <div className='tc'>
                <h1 className = 'f-subheadline lh-title1'>RoboFriends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll> 
                    <CardList robots = { filteredRobots } /> 
                </Scroll>
            </div>
        )
        }
    }

export default App;