import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';




test("renders without error", () => {
    render(<Episode episode= {{}}/>)

});

test("renders the summary test passed as prop", ()=>{
    //Arrange
    render(<Episode episode= {{
        id: 1,
        image: "",
        name: "",
        season: 1,
        number: 1,
        summary: "example summary",
        runtime: "example runtime",
    }}/>)

    //Act
    const sum = screen.queryByText(/example summary/i);
    // console.log(sum);
    //Arrange
    expect(sum).toBeInTheDocument();
    expect(sum).toHaveTextContent("example summary");

});

test("renders default image when image is not defined", ()=>{

    render(<Episode episode= {{
        id: 1,
        image: "https://i.ibb.co/2FsfXqM/stranger-things.png",
        name: "",
        season: 1,
        number: 1,
        summary: "example summary",
        runtime: "example runtime",
    }}/>)

    const altTxt = screen.queryByAltText("https://i.ibb.co/2FsfXqM/stranger-things.png")

    expect(altTxt).toBeInTheDocument();

});
