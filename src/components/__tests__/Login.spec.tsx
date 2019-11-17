// __tests__/login.js
// again, these first two imports are something you'd normally handle in
// your testing framework configuration rather than importing them in every file.
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Login from '../Login';

describe('Login', () => {

  beforeEach(() => {
    window.localStorage.removeItem('token');
  });
  it('allows the user to login successfully', async () => {
    // mock out window.fetch for the test
    const fakeUserResponse = { token: 'fake_user_token' };
    jest.spyOn(window, 'fetch').mockImplementationOnce((): Promise<any> => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeUserResponse),
      });
    });

    const { getByLabelText, getByText, findByRole } = render(<Login />);

    // fill out the form
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'chuck' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'norris' } });

    fireEvent.click(getByText(/submit/i));

    // just like a manual tester, we'll instruct our test to wait for the alert
    // to show up before continuing with our assertions.
    const alert = await findByRole('alert');

    // .toHaveTextContent() comes from jest-dom's assertions
    // otherwise you could use expect(alert.textContent).toMatch(/congrats/i)
    // but jest-dom will give you better error messages which is why it's recommended
    expect(alert).toHaveTextContent(/congrats/i);
    expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token);
  });

  it('throw error if failed to login', async () => {
    // mock out window.fetch for the test

    jest.spyOn(window, 'fetch').mockImplementationOnce((): Promise<any> => {
      return Promise.resolve({
        json: () => Promise.reject({ message: 'i dont like it' }),
      });
    });

    const { getByLabelText, getByText, findByRole } = render(<Login />);

    // fill out the form
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'chuck' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'norris' } });

    fireEvent.click(getByText(/submit/i));

    // just like a manual tester, we'll instruct our test to wait for the alert
    // to show up before continuing with our assertions.
    const alert = await findByRole('alert');

    // .toHaveTextContent() comes from jest-dom's assertions
    // otherwise you could use expect(alert.textContent).toMatch(/congrats/i)
    // but jest-dom will give you better error messages which is why it's recommended
    expect(alert).toHaveTextContent(/dont/i);
    expect(window.localStorage.getItem('token')).toBeNull(); // Equal('undefined');
  });

  it('throw error if network failed', async () => {
    // mock out window.fetch for the test

    jest.spyOn(window, 'fetch').mockImplementationOnce((): Promise<any> => {
      return Promise.resolve({
        json: () => { throw TypeError('Failed to Fetch'); },
      });
    });

    const { getByLabelText, getByText, findByRole } = render(<Login />);

    // fill out the form
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'chuck' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'norris' } });

    fireEvent.click(getByText(/submit/i));

    // just like a manual tester, we'll instruct our test to wait for the alert
    // to show up before continuing with our assertions.
    const alert = await findByRole('alert');

    // .toHaveTextContent() comes from jest-dom's assertions
    // otherwise you could use expect(alert.textContent).toMatch(/congrats/i)
    // but jest-dom will give you better error messages which is why it's recommended
    expect(alert).toHaveTextContent(/Failed/i);
    expect(window.localStorage.getItem('token')).toBeNull(); // Equal('undefined');
  });
});
