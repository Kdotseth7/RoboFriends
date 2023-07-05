import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

const App = () => {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         searchField: ''
    //     }
    //     console.log('constructor');
    // }

    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users') // fetch() is a window object
    //     .then( response => response.json())
    //     .then( users => this.setState( { robots: users }));
    // }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users') // fetch() is a window object
            .then(response => response.json())
            .then(users => {
                setRobots(users)
            });
        console.log('useEffect');
    })

    const onSearchChange = event => {
        setSearchField(event.target.value);
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    console.log('render');

    return !robots.length ? <h1 className='tc'>Loading</h1> : (
        <div className='tc'>
            <h1 className='f-subheadline lh-title1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
            </Scroll>
        </div>
    )
}

export default App;