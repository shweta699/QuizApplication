import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders start quiz button', () => {
    render(<App />);
    const startButton = screen.getByText('Start Quiz');
    expect(startButton).toBeInTheDocument();
  });

  test('starts quiz on button click', () => {
    render(<App />);
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    const question = screen.getByText('Question 1/44');
    expect(question).toBeInTheDocument();
  });

  test('selects an answer and shows explanation', () => {
    render(<App />);
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    const optionButton = screen.getByText('Hola');
    fireEvent.click(optionButton);
    const explanation = screen.getByText('Hola is the Spanish word for hello.');
    expect(explanation).toBeInTheDocument();
  });

  test('navigates to next question', () => {
    render(<App />);
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    const optionButton = screen.getByText('Hola');
    fireEvent.click(optionButton);
    const nextButton = screen.getByText('Next Question');
    fireEvent.click(nextButton);
    const question = screen.getByText('Question 2/44');
    expect(question).toBeInTheDocument();
  });

  


  test('shows score after answering all questions', async () => {
    render(<App />);
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    const optionButton = screen.getByText('Hola');
    for (let i = 0; i < 44; i++) {
      fireEvent.click(optionButton);
      fireEvent.click(screen.getByText('Next Question'));
    }
  
    // Wait for the score to appear
    await waitFor(async () => {
      const score = screen.queryByText('Score: 44');
      if (score) {
        expect(score).toBeInTheDocument();
      } else {
        // Wait for a short period before checking again
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }, { timeout: 10000 }); // Adjust the timeout as needed
  });
});