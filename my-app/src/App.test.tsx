import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App />);
  const button = screen.getByRole('button', {name: 'Change to blue'});
  expect(button).toHaveStyle({backgroundColor: 'red'});
});

test('button turns blue when clicked', () => {
  render(<App />);
  const button = screen.getByRole('button', {name: 'Change to blue'});
  fireEvent.click(button);
  expect(button).toHaveStyle({backgroundColor: 'blue'});
  expect(button.textContent).toBe('Change to red');
});

describe('initial conditions', () => {
  test('button is enabled', () => {
    render(<App />);
    const button = screen.getByRole('button', {name: 'Change to blue'});
    expect(button).toBeEnabled();
  });

  test('checkbox is unchecked', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked();
  });
});

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />);
  // Don't need to redefine, unless the element actually disappears from the DOM.
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const button = screen.getByRole('button', {name: 'Change to blue'});
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).not.toBeDisabled();
});

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const button = screen.getByRole('button', {name: 'Change to blue'});
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'red'});
  expect(button).not.toBeDisabled();
});

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const button = screen.getByRole('button', {name: 'Change to blue'});

  fireEvent.click(button);
  expect(button).toHaveStyle({backgroundColor: 'blue'});

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'blue'});
});

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});