import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SortVisualiser from './SortVisualiser/SortVisualiser';
import MultipleVisualiser from './SortVisualiser/MultipleVisualiser';

const App = () => (
  <Router>
    <Switch>
      <Route path="/visualise" component={MultipleVisualiser} />
      <Route path="/" component={SortVisualiser} />
    </Switch>
  </Router>
);

const TargetComponent = () => <div>This is the target component.</div>;

export default App;
