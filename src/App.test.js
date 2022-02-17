import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { ProvideGameState } from './utils/gameStateTools';

test('renders learn react link', () => {
  render(
    <ProvideGameState>
      <App />
    </ProvideGameState>);
});
