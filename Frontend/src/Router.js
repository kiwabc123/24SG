import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import App from './App';
import Profile from './Profile';

function RouterComponent() {
  return (
    <Router>
      <Link>
        <Route exact path="/" component={App} />
        <Route path="/profile/:id" component={Profile} />
      </Link>
    </Router>
  );
}

export default RouterComponent;
