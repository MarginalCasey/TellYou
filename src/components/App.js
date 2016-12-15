import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-touch-backend';
import User from '../containers/User.js';
import './App.css';
import 'sweetalert/dist/sweetalert.css';

import { demoStart } from '../actions/demo.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      demo: (location.pathname.slice(0, 5) === '/demo')
    };

    if(this.state.demo)
      this.props.dispatch(demoStart());
  }

  render() {
    const { children } = this.props;

    return (
      <div id="surface">
        <header>
          <Link to="/">
            Tell<strong>You</strong>
          </Link>
          <User />
        </header>

        <nav>
        {
          this.state.demo && 
          <ul>
            <li><Link to="/demo/friends" activeClassName="active">朋友圈</Link></li>
            <li><Link to="/demo/feed" activeClassName="active">動態</Link></li>
          </ul>
        }
        {
          !this.state.demo && 
          <ul>
            <li><Link to="/friends" activeClassName="active">朋友圈</Link></li>
            <li><Link to="/feed" activeClassName="active">動態</Link></li>
          </ul>
        }
        </nav>

        <main>
          {children}
        </main>
      </div>
    );
  }
}

App = connect()(App);

export default DragDropContext(HTML5Backend)(App)
