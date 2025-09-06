import '@testing-library/jest-dom'
import { vi } from 'vitest'

 // Use safe framer-motion mock that strips motion-only props to avoid DOM warnings
vi.mock('framer-motion', async () => await import('./__mocks__/framer-motion'));

// Mock speech recognition
Object.defineProperty(window, 'SpeechRecognition', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    abort: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

Object.defineProperty(window, 'webkitSpeechRecognition', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    abort: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

// Mock window.location.reload
Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn(),
  },
  writable: true,
});
