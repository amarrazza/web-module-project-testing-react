import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';


test('renders without errors', ()=>{
    render(<Show/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />)

    const loadingScreen = screen.queryByTestId(/loading-container/i);

    expect(loadingScreen).toBeInTheDocument;
    expect(loadingScreen).toHaveTextContent(/fetching data/i);
});


const testShow = {
    name: "",
    summary: "",
    seasons: [
        {episodes: [], id: 0, name: "season 1"},
        {episodes: [], id: 1, name: "season 2"},
    ]}

test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testShow} selectedSeason={"none"}/>)

    const seasonOptions = screen.queryAllByTestId(/season-option/i);

    expect(seasonOptions).toHaveLength(2);


});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect} />);

    const select = screen.getByLabelText(/Select A season/i);

    userEvent.selectOptions(select, ['1']);

    expect(handleSelect).toBeCalled();


});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {

    const { rerender } = render(<Show show={testShow} selectedSeason={"none"} />)

    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={testShow} selectedSeason={1} />);

    episodes = screen.queryByTestId('episodes-container');
    expect(episodes).toBeInTheDocument();


    

});
