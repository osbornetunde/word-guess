import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StartScreen } from "../StartScreen";

// Mock framer-motion components
vi.mock("framer-motion", () => ({
  motion: {
    div: "div",
    button: "button",
    span: "span",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    p: "p",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe("StartScreen", () => {
  const mockOnStartGame = vi.fn();

  beforeEach(() => {
    mockOnStartGame.mockClear();
  });

  it("renders the start screen with title", () => {
    render(<StartScreen onStartGame={mockOnStartGame} />);

    expect(screen.getByText("Word Guess Game! 🎯")).toBeInTheDocument();
    expect(screen.getByText(/Test your vocabulary skills/)).toBeInTheDocument();
  });

  it("shows team setup section", () => {
    render(<StartScreen onStartGame={mockOnStartGame} />);

    expect(screen.getByText("Add Teams 👥")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter team name..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("shows game settings section", () => {
    render(<StartScreen onStartGame={mockOnStartGame} />);

    expect(screen.getByText("Game Settings ⚙️")).toBeInTheDocument();
    expect(screen.getByText("Difficulty Level")).toBeInTheDocument();
    expect(screen.getByText("Number of Words: 10")).toBeInTheDocument();
    expect(screen.getByText("Game Mode")).toBeInTheDocument();
  });

  it("allows adding a team", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText("Enter team name...");
    const addButton = screen.getByText("Add");

    await user.type(input, "Team Alpha");
    await user.click(addButton);

    expect(screen.getByText("Team Alpha")).toBeInTheDocument();
  });

  it("allows adding multiple teams", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText("Enter team name...");
    const addButton = screen.getByText("Add");

    // Add first team
    await user.type(input, "Team Alpha");
    await user.click(addButton);

    // Clear input and add second team
    await user.clear(input);
    await user.type(input, "Team Beta");
    await user.click(addButton);

    expect(screen.getByText("Team Alpha")).toBeInTheDocument();
    expect(screen.getByText("Team Beta")).toBeInTheDocument();
  });

  it("allows removing a team", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText("Enter team name...");
    const addButton = screen.getByText("Add");

    // Add team
    await user.type(input, "Team Alpha");
    await user.click(addButton);

    // Remove team
    const removeButton = screen.getByText("×");
    await user.click(removeButton);

    expect(screen.queryByText("Team Alpha")).not.toBeInTheDocument();
  });

  it("prevents adding empty team name", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const addButton = screen.getByText("Add");
    await user.click(addButton);

    // Should not add empty team
    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });

  it("prevents adding team with only whitespace", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText("Enter team name...");
    const addButton = screen.getByText("Add");

    await user.type(input, "   ");
    await user.click(addButton);

    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });

  it("allows selecting difficulty levels", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const mediumButton = screen.getByText("medium");
    await user.click(mediumButton);

    // Should show medium difficulty description
    expect(screen.getByText(/Moderate challenge/)).toBeInTheDocument();
  });

  it("allows changing number of words", async () => {
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "15" } });

    expect(screen.getByText("Number of Words: 15")).toBeInTheDocument();
  });

  it("allows selecting answer mode", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const tilesButton = screen.getByText("tiles");
    await user.click(tilesButton);

    // Should show tiles mode description
    expect(screen.getByText(/Per-letter boxes/)).toBeInTheDocument();
  });

  it("shows game rules", () => {
    render(<StartScreen onStartGame={mockOnStartGame} />);

    expect(screen.getByText("Game Rules 📋")).toBeInTheDocument();
    expect(
      screen.getByText(/Teams take turns guessing words/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Correct answers earn 10 points/),
    ).toBeInTheDocument();
  });

  it("disables start button when less than 2 teams", () => {
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const startButton = screen.getByText("Add at least 2 teams to start");
    expect(startButton).toBeDisabled();
  });

  it("enables start button when 2 or more teams are added", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText("Enter team name...");
    const addButton = screen.getByText("Add");

    // Add first team
    await user.type(input, "Team Alpha");
    await user.click(addButton);

    // Add second team
    await user.clear(input);
    await user.type(input, "Team Beta");
    await user.click(addButton);

    const startButton = screen.getByText("Start Game! 🚀");
    expect(startButton).not.toBeDisabled();
  });

  it("calls onStartGame with correct settings when start button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    // Add teams
    const input = screen.getByPlaceholderText("Enter team name...");
    const addButton = screen.getByText("Add");

    await user.type(input, "Team Alpha");
    await user.click(addButton);

    await user.clear(input);
    await user.type(input, "Team Beta");
    await user.click(addButton);

    // Change settings
    const hardButton = screen.getByText("hard");
    await user.click(hardButton);

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "12" } });

    const voiceButton = screen.getByText("voice");
    await user.click(voiceButton);

    // Start game
    const startButton = screen.getByText("Start Game! 🚀");
    await user.click(startButton);

    expect(mockOnStartGame).toHaveBeenCalledWith({
      difficulty: "hard",
      numberOfWords: 12,
      teams: [
        {
          id: expect.any(String),
          name: "Team Alpha",
          score: 0,
          color: expect.any(String),
        },
        {
          id: expect.any(String),
          name: "Team Beta",
          score: 0,
          color: expect.any(String),
        },
      ],
      answerMode: "voice",
    });
  });

  it("supports keyboard enter to add team", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText("Enter team name...");

    await user.type(input, "Team Gamma{enter}");

    expect(screen.getByText("Team Gamma")).toBeInTheDocument();
  });

  it("limits team name length", async () => {
    const user = userEvent.setup();
    render(<StartScreen onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText("Enter team name...");
    const longName = "A".repeat(25); // Exceeds max length

    await user.type(input, longName);

    // Should be limited to maxLength (20 characters)
    expect(input).toHaveValue(longName.slice(0, 20));
  });

  it("shows team count limits", () => {
    render(<StartScreen onStartGame={mockOnStartGame} />);

    expect(
      screen.getByText("0/20 teams • Minimum 2 teams required"),
    ).toBeInTheDocument();
  });
});
