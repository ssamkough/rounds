export type Prompt = "oneSentence" | "drawing" | "multipleChoice";

export interface MultipleChoice {
  question: string;
  choices: [string, string, string, string];
}

const oneSentencePrompts: string[] = [
  "in one sentence, explain what your friend does for fun",
  "in one sentence, describe what your friend does for their job",
  "in one sentence, describe a quirk that your friend does often",
];

const drawingPrompts: string[] = [
  "draw what your friend thinks they look like in their own head",
  "draw your friend's favorite food",
  "draw your what a perfect day looks like to your friend",
];

const multipleChoicePrompts: MultipleChoice[] = [
  {
    question:
      "which word most accurately describes your friend when they're drunk?",
    choices: ["sleepy", "angry", "sad", "needs to shit"],
  },
  {
    question: "out of these, what is your friend most afraid of?",
    choices: ["spiders", "heights", "flying", "marriage"],
  },
  {
    question: "what sport does your friend most enjoy?",
    choices: ["soccer", "basketball", "ping pong", "valorant"],
  },
];

export const prompts: Record<Prompt, Array<string | MultipleChoice>> = {
  oneSentence: oneSentencePrompts,
  drawing: drawingPrompts,
  multipleChoice: multipleChoicePrompts,
};

export const promptTypes: Prompt[] = [
  "oneSentence",
  "drawing",
  "multipleChoice",
];
