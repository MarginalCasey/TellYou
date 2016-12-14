import React, {Component} from 'react';
import { Link } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import User from '../containers/User.js';
import './App.css';
import 'sweetalert/dist/sweetalert.css';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div id="surface">
        <header>
          Tell<strong>You</strong>
          <User />
        </header>

        <nav>
          <ul>
            <li><Link to="/friends" activeClassName="active">朋友圈</Link></li>
            <li><Link to="/feed" activeClassName="active">動態</Link></li>
          </ul>
        </nav>

        <main>
          {children}
        </main>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
