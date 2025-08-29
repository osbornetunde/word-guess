
import { useState, useEffect, useRef } from 'react';

// Type definitions for the SpeechRecognition API
// This avoids needing to add the "dom" library to tsconfig.json
type SpeechRecognitionErrorCode =
  | 'no-speech'
  | 'aborted'
  | 'audio-capture'
  | 'network'
  | 'not-allowed'
  | 'service-not-allowed'
  | 'bad-grammar'
  | 'language-not-supported';

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: SpeechRecognitionErrorCode;
  readonly message: string;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: SpeechRecognitionStatic;
  webkitSpeechRecognition?: SpeechRecognitionStatic;
  mozSpeechRecognition?: SpeechRecognitionStatic;
  msSpeechRecognition?: SpeechRecognitionStatic;
}

// Get the browser's SpeechRecognition object
const getSpeechRecognition = (): SpeechRecognitionStatic | undefined => {
  if (typeof window !== 'undefined') {
    const windowWithSpeech = window as WindowWithSpeechRecognition;
    return (
      windowWithSpeech.SpeechRecognition ||
      windowWithSpeech.webkitSpeechRecognition ||
      windowWithSpeech.mozSpeechRecognition ||
      windowWithSpeech.msSpeechRecognition
    );
  }
  return undefined;
};

interface UseSpeechToTextOptions {
  lang?: string;
  interimResults?: boolean;
  continuous?: boolean;
}

export const useSpeechToText = (options?: UseSpeechToTextOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = options?.lang || 'en-US';
    recognition.interimResults = options?.interimResults || false;
    recognition.continuous = options?.continuous || false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      setTranscript(finalTranscript.trim());
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [options?.lang, options?.interimResults, options?.continuous]);

  const start = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setError(null);
      } catch {
        setError('Speech recognition could not be started.');
      }
    }
  };

  const stop = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    error,
    start,
    stop,
    supported: !!getSpeechRecognition(),
  };
};
