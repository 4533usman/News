import React, { Component } from 'react'
import Nav from './components/Nav'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state={ progress:0 };
  setProgress = (progress) => {
    this.setState({ progress:progress })
  }
  render() {
    return (
      <>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Nav />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key='general' pagesize={3} country='us' category='general' />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key='business' pagesize={3} country='us' category='business' />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key='entertainment' pagesize={3} country='us' category='entertainment' />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key='health' pagesize={3} country='us' category='health' />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key='science' pagesize={3} country='us' category='science' />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key='sports' pagesize={3} country='us' category='sports' />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key='technology' pagesize={3} country='us' category='technology' />}></Route>
          </Routes>
        </Router>
      </>
    )
  }
}

