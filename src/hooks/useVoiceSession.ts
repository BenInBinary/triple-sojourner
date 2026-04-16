import { useState, useEffect, useRef, useCallback } from 'react';

interface UseVoiceSessionOptions {
  questionText: string;
  onTranscriptUpdate: (finalText: string, interimText: string) => void;
}

export const useVoiceSession = ({ questionText, onTranscriptUpdate }: UseVoiceSessionOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null); // any for webkitSpeechRecognition

  // 1. Speak the question
  const speakQuestion = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(questionText);
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      startListening(); // Auto-start listening after AI finishes asking
    };

    window.speechSynthesis.speak(utterance);
  }, [questionText]);

  // 2. Start listening (STT)
  const startListening = () => {
    try {
      // Setup SpeechRecognition mapping voice to text input
      const win = window as any;
      const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' ';
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          
          onTranscriptUpdate(finalTranscript, interimTranscript);
        };

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.start();
      }
    } catch (err) {
      console.error("Failed to access microphone for STT:", err);
    }
  };

  const stopSession = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsSpeaking(false);
  };

  useEffect(() => {
    speakQuestion();
    return () => stopSession(); // Cleanup on unmount
  }, [speakQuestion]);

  return { isListening, isSpeaking, stopSession };
};
