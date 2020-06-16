import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Main App Test', () => {
  const initialState = { setGame: {} }
  const mockStore = configureStore()
  let store;

  it('Shows Game Title', () => {
    store = mockStore(initialState)
    const { getByText } = render(<Provider store={store}><App /></Provider>)

    const header = getByText(/Treasure Hunter Game/i);
    expect(header).toBeInTheDocument();
  });

  it('Button is disabled', () => {
    store = mockStore(initialState)
    const {
      getByPlaceholderText,
      getByRole,
    } = render(<Provider store={store}><App /></Provider>)

    const input = getByPlaceholderText(/enter your name.../i);
    expect(input).toBeInTheDocument();
    expect(getByRole("submit-button")).toBeDisabled();
  });


})