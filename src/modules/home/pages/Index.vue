<template>
  <div class="p-10">
    <h3>Speech to Text and Text to Speech</h3>
    <div class="flex gap-2 my-5">
      <AppButton @click="startListening" :disabled="isListening">Start Recording</AppButton>
      <AppButton @click="stopListening" :disabled="!isListening">Stop Recording</AppButton>
      <AppButton @click="playText" :disabled="!transcript">Play Text</AppButton>
    </div>

    <div v-if="isListening">
      <p>Recording... Please speak.</p>
    </div>

    <div>
      <h5>Transcribed Text:</h5>
      <p class="text-grey-300">{{ transcript }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Reactive states
const transcript = ref(""); // Stores the transcribed text
const isListening = ref(false); // Indicates whether recording is active
let recognition = null; // SpeechRecognition object

// Initialize SpeechRecognition
const initializeRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support the Speech Recognition API.");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true; // Keep listening until stopped
  recognition.interimResults = true; // Capture partial (interim) results
  recognition.lang = "en-US"; // Set language to English

  // Handle speech recognition results
  recognition.onresult = (event) => {
    const interimTranscript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    transcript.value = interimTranscript; // Update the transcript in real-time
  };

  // Handle recognition errors
  recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
  };

  // Handle recognition end
  recognition.onend = () => {
    isListening.value = false;
  };
};

// Start listening
const startListening = () => {
  if (!recognition) initializeRecognition();
  isListening.value = true;
  transcript.value = ""; 
  recognition?.start();
};

// Stop listening
const stopListening = () => {
  recognition?.stop();
  isListening.value = false;
};

const playText = () => {
  if (!transcript.value) return;

  const speech = new SpeechSynthesisUtterance(transcript.value);
  speech.lang = "en-US"; 
  speech.rate = 1; 
  speech.pitch = 1; 
  window.speechSynthesis.speak(speech);
};
</script>

<style>
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  font-size: 18px;
  margin-top: 10px;
}
</style>
