export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Gameplay' | 'Fairness & AI' | 'Rooms & Multiplayer' | 'Monetization & Features';
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Gameplay',
    question: 'How long is a typical match?',
    answer: 'Each match is designed to last 2 to 5 minutes. Fast-paced turn timers and smart free-text questions keep gameplay snappy and highly replayable.'
  },
  {
    id: 'faq-2',
    category: 'Gameplay',
    question: 'What happens if I make a wrong guess?',
    answer: 'A wrong guess does NOT end the match immediately! Instead, a penalty is applied: you lose your next questioning turn, cannot ask the next question, and give your opponent one bonus questioning turn. This encourages gathering enough information before making a guess.'
  },
  {
    id: 'faq-3',
    category: 'Gameplay',
    question: 'Are questions multiple choice or free-text?',
    answer: 'Questions are 100% free-text! Unlike traditional trivia games with predefined choices, you can ask any intelligent question to narrow down possibilities (e.g., "Is it warm-blooded?", "Was it manufactured after 2015?", "Is this cricketer a fast bowler?").'
  },
  {
    id: 'faq-4',
    category: 'Gameplay',
    question: 'Why do both players choose from the same category?',
    answer: 'Selecting secrets from the exact same category ensures absolute fairness, symmetric information depth, and meaningful questioning strategy.'
  },
  {
    id: 'faq-5',
    category: 'Fairness & AI',
    question: 'How does the AI Fair Play Review work?',
    answer: 'After any completed match, players can tap "Review with AI". Powered by Gemini 3.6, the AI analyzes the entire conversation history to detect contradictory answers, logical inconsistencies, or misleading responses, generating a Fair Play Score % and detailed report.'
  },
  {
    id: 'faq-6',
    category: 'Rooms & Multiplayer',
    question: 'Can I play with private room codes or public matchmaking?',
    answer: 'You can easily create a private room and share a 6-character room code with friends! Public matchmaking, ranked seasons, daily challenges, and tournaments will also be supported in future updates.'
  },
  {
    id: 'faq-7',
    category: 'Monetization & Features',
    question: 'Is SiftMates free to play? Is there Pay-To-Win?',
    answer: 'SiftMates is 100% Free-to-Play and strictly NEVER Pay-to-Win. All purchases are strictly cosmetic (custom themes, avatar frames, animated victory celebrations, profile skins).'
  },
  {
    id: 'faq-8',
    category: 'Gameplay',
    question: 'Can I review my previous matches?',
    answer: 'Yes! Every completed game saves a scrollable timeline replay showing every question asked, answer given, guess attempt, and final result, allowing you to refine your deduction strategy over time.'
  }
];
