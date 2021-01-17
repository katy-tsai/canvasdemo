import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Canvans from './components/canvas/Canvas';
import NineGrid from './components/nineGrid/NineGrid';
import Layout from './components/layout/Layout';
import ReactDnd from './components/reactdnd/ReactDnd';
import KonvaDemo from './components/konva/KonvaDemo';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Canvans} />
        <Route path="/nineGrid"  component={NineGrid} />
        <Route path="/reactdnd"  component={ReactDnd} />
        <Route path="/konva_demo"  component={KonvaDemo} />
      </Switch>
  </Layout>
  );
}

export default App;
