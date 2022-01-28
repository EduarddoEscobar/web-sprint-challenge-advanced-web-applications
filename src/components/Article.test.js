import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testArticle = {
    author: "Susan Snyder",
    body: "The Pennsylvania State System of Higher Education has said its 14 public universities, including West Chester and Cheyney, don’t have the authority to require a vaccine and would need legislation. Neither Pennsylvania State University nor Temple University, which are state-related, have required the vaccines either.",
    createdOn: "2022-01-25T02:01:33-05:00",
    headline: "Community College of Philadelphia to require vaccines, the first public college in the region to do so.",
    id: "jls0a",
    image: 175,
    summary: "The requirement, which will allow exemptions for medical and religious reasons, won’t be in place for the start of the semester."
}

test('renders component without errors', ()=> {
    render(<Article article={testArticle} />);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle} />);

    const headline = screen.getByTestId('headline');
    const author = screen.getByTestId('author');
    const summary = screen.getByTestId('summary');
    const body = screen.getByTestId('body');

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(headline).toHaveTextContent(testArticle.headline);
    expect(author).toHaveTextContent(testArticle.author);
    expect(summary).toHaveTextContent(testArticle.summary);
    expect(body).toHaveTextContent(testArticle.body);
});;

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={{...testArticle, author:''}} />);

    const author = screen.queryByTestId('author');

    expect(author).toBeTruthy();
    expect(author).toHaveTextContent(/associated press/i);
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const mockHandleDelete = jest.fn();
    render(<Article article={testArticle} handleDelete={mockHandleDelete} />);

    const deleteButton = screen.queryByTestId('deleteButton');
    userEvent.click(deleteButton);

    expect(mockHandleDelete.mock.calls.length).toBe(1);
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.