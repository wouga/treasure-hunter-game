import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('Main App Test', () => {
  const initialState = { setGame: {} }
  const mockStore = configureStore()
  let store;

  it('Shows Game Title', () => {
    store = mockStore(initialState)
    const { getByText } = render(<Provider store={store}><App /></Provider>)

    const linkElement = getByText(/Treasure Hunter Game/i);
    expect(linkElement).toBeInTheDocument();
  });

  
})