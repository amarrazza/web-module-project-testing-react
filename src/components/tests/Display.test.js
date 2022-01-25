import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

import Display from './../Display';

const testShow = {
    name: "",
    summary: "",
    seasons: [
        {episodes: [], id: 0, name: "season 1"},
        {episodes: [], id: 1, name: "season 2"},
    ]}

test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async ()=>{

    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument()
});

test('renders show season options matching your data when the button is clicked', async ()=>{

    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        
        expect(seasonOptions).toHaveLength(2);
    })


});
