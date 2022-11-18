import React from 'react';

import RaceScreen from './components/screens/RaceScreen';
import { RaceProvider } from './Context';

const App = () => {
  return (
    <RaceProvider>
      <RaceScreen />
    </RaceProvider>
  );
};

export default App;
