import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    const { getByText } = render(<App />);
    expect(getByText('Learn React')).toBeDefined();
  });
});

