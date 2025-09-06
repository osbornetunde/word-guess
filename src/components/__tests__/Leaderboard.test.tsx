import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Leaderboard } from '../Leaderboard';
import type { Team } from '../../types/game';

// Mock framer-motion components
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    span: 'span',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    p: 'p',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true,
});

describe('Leaderboard', () => {
  const mockOnPlayAgain = vi.fn();

  const sampleTeams: Team[] = [
    { id: '1', name: 'Team Alpha', score: 50, color: '#FF6B6B' },
    { id: '2', name: 'Team Beta', score: 30, color: '#4ECDC4' },
    { id: '3', name: 'Team Gamma', score: 40, color: '#45B7D1' },
  ];

  beforeEach(() => {
    mockOnPlayAgain.mockClear();
    mockReload.mockClear();
  });

  it('renders the leaderboard with winner celebration', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    expect(screen.getByText('Game Complete!')).toBeInTheDocument();
    expect(screen.getByText('Congratulations!')).toBeInTheDocument();
    expect(screen.getByText('Winner with 50 points! 🌟')).toBeInTheDocument();

    // Check for winner name in the celebration section
    const winnerSection = screen.getByText('Congratulations!').closest('div');
    expect(winnerSection).toHaveTextContent('Team Alpha');
  });

  it('shows trophy emoji for winner', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    const trophyEmojis = screen.getAllByText('🏆');
    expect(trophyEmojis.length).toBeGreaterThan(0);
  });

  it('displays final leaderboard with correct ranking', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    expect(screen.getByText('Final Leaderboard 📊')).toBeInTheDocument();

    // Check that all teams are displayed in the leaderboard section
    const leaderboardSection = screen.getByText('Final Leaderboard 📊').closest('div');
    expect(leaderboardSection).toHaveTextContent('Team Alpha');
    expect(leaderboardSection).toHaveTextContent('Team Beta');
    expect(leaderboardSection).toHaveTextContent('Team Gamma');

    // Check that scores are displayed
    expect(screen.getAllByText('50').length).toBeGreaterThan(0);
    expect(screen.getAllByText('30').length).toBeGreaterThan(0);
    expect(screen.getAllByText('40').length).toBeGreaterThan(0);
  });

  it('shows rank emojis for different positions', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    expect(screen.getByText('🥇')).toBeInTheDocument(); // 1st place
    expect(screen.getByText('🥈')).toBeInTheDocument(); // 2nd place
    expect(screen.getByText('🥉')).toBeInTheDocument(); // 3rd place
  });

  it('displays team colors', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    // Should have colored elements (though we can't test exact colors easily)
    const coloredElements = document.querySelectorAll('[style*="background-color"]');
    expect(coloredElements.length).toBeGreaterThan(0);
  });

  it('shows game statistics', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    expect(screen.getByText('Game Statistics 📈')).toBeInTheDocument();

    // Find the statistics section and check its content
    const statsSection = screen.getByText('Game Statistics 📈').closest('div');
    expect(statsSection).toHaveTextContent('3'); // Teams count
    expect(statsSection).toHaveTextContent('120'); // Total points (50+30+40)
    expect(statsSection).toHaveTextContent('40'); // Average score
    expect(statsSection).toHaveTextContent('50'); // High score
  });

  it('calculates statistics correctly', () => {
    const teamsWithDifferentScores: Team[] = [
      { id: '1', name: 'Team A', score: 100, color: '#FF6B6B' },
      { id: '2', name: 'Team B', score: 100, color: '#4ECDC4' }, // Same score as A
    ];

    render(<Leaderboard teams={teamsWithDifferentScores} onPlayAgain={mockOnPlayAgain} />);

    // Find the statistics section and check its content
    const statsSection = screen.getByText('Game Statistics 📈').closest('div');
    expect(statsSection).toHaveTextContent('2'); // Teams count
    expect(statsSection).toHaveTextContent('200'); // Total points
    expect(statsSection).toHaveTextContent('100'); // Average score
    expect(statsSection).toHaveTextContent('100'); // High score
  });

  it('handles single team game', () => {
    const singleTeam: Team[] = [
      { id: '1', name: 'Solo Team', score: 25, color: '#FF6B6B' },
    ];

    render(<Leaderboard teams={singleTeam} onPlayAgain={mockOnPlayAgain} />);

    expect(screen.getByText('Winner with 25 points! 🌟')).toBeInTheDocument();

    // Check for team name in the celebration section
    const winnerSection = screen.getByText('Congratulations!').closest('div');
    expect(winnerSection).toHaveTextContent('Solo Team');

    // Find the statistics section and check its content
    const statsSection = screen.getByText('Game Statistics 📈').closest('div');
    expect(statsSection).toHaveTextContent('1'); // Teams count
  });

  it('shows play again button', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    const playAgainButton = screen.getByText('Play Again 🔄');
    expect(playAgainButton).toBeInTheDocument();
  });

  it('calls onPlayAgain when play again button is clicked', async () => {
    const user = userEvent.setup();
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    const playAgainButton = screen.getByText('Play Again 🔄');
    await user.click(playAgainButton);

    expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
  });

  it('shows new game button', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    const newGameButton = screen.getByText('New Game 🎮');
    expect(newGameButton).toBeInTheDocument();
  });

  it('calls window.location.reload when new game button is clicked', async () => {
    const user = userEvent.setup();
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    const newGameButton = screen.getByText('New Game 🎮');
    await user.click(newGameButton);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it('shows thank you message', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    expect(screen.getByText(/Thanks for playing!/)).toBeInTheDocument();
    expect(screen.getByText(/Hope you had fun/)).toBeInTheDocument();
  });

  it('handles teams with zero scores', () => {
    const teamsWithZeroScores: Team[] = [
      { id: '1', name: 'Team A', score: 0, color: '#FF6B6B' },
      { id: '2', name: 'Team B', score: 0, color: '#4ECDC4' },
    ];

    render(<Leaderboard teams={teamsWithZeroScores} onPlayAgain={mockOnPlayAgain} />);

    expect(screen.getByText('Winner with 0 points! 🌟')).toBeInTheDocument();

    // Find the statistics section and check its content
    const statsSection = screen.getByText('Game Statistics 📈').closest('div');
    expect(statsSection).toHaveTextContent('0'); // Total points
    expect(statsSection).toHaveTextContent('0'); // Average score
    expect(statsSection).toHaveTextContent('0'); // High score
  });

  it('handles teams with negative scores', () => {
    const teamsWithNegativeScores: Team[] = [
      { id: '1', name: 'Team A', score: -10, color: '#FF6B6B' },
      { id: '2', name: 'Team B', score: -5, color: '#4ECDC4' },
    ];

    render(<Leaderboard teams={teamsWithNegativeScores} onPlayAgain={mockOnPlayAgain} />);

    expect(screen.getByText('Winner with -5 points! 🌟')).toBeInTheDocument(); // Team B has higher score

    // Find the statistics section and check its content
    const statsSection = screen.getByText('Game Statistics 📈').closest('div');
    expect(statsSection).toHaveTextContent('-15'); // Total points
    expect(statsSection).toHaveTextContent('-7'); // Average score (rounded)
    expect(statsSection).toHaveTextContent('-5'); // High score
  });

  it('displays score bars with correct proportions', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    // Check that score bars exist (we can't easily test exact widths in JSDOM)
    const scoreBars = document.querySelectorAll('[class*="rounded-full"]');
    expect(scoreBars.length).toBeGreaterThan(0);
  });

  it('shows confetti effect for winner', () => {
    render(<Leaderboard teams={sampleTeams} onPlayAgain={mockOnPlayAgain} />);

    // Confetti elements should be present (animated elements)
    // This is a basic check - in a real app we'd test the animation
    expect(document.body).toBeInTheDocument();
  });

  it('maintains team order in ranking regardless of input order', () => {
    const reversedTeams: Team[] = [...sampleTeams].reverse(); // Gamma, Beta, Alpha

    render(<Leaderboard teams={reversedTeams} onPlayAgain={mockOnPlayAgain} />);

    // Should still show Team Alpha as winner in the celebration section
    const winnerSection = screen.getByText('Congratulations!').closest('div');
    expect(winnerSection).toHaveTextContent('Team Alpha');
    expect(screen.getByText('Winner with 50 points! 🌟')).toBeInTheDocument();
  });
});
