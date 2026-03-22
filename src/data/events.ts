export interface Event {
  id: string;
  title: string;
  description: string;
  year: number; // Numeric value for sorting (e.g., -5000 for 5000 BCE)
  displayYear: string; // How it's shown (e.g., "7000 BCE", "Treta Yuga")
  category: 'history' | 'mythology';
  explanation: string;
  yuga?: 'satya' | 'treta' | 'dvapara' | 'kali';
}

export const events: Event[] = [
  // Mythology
  {
    id: 'm1',
    title: 'Samudra Manthan',
    description: 'The churning of the cosmic ocean by Devas and Asuras to obtain Amrita.',
    year: -15000,
    displayYear: 'Satya Yuga',
    category: 'mythology',
    explanation: 'One of the most famous episodes in the Puranas, it explains the origin of Amrita (the nectar of immortality).',
    yuga: 'satya'
  },
  {
    id: 'm2',
    title: 'Rama\'s Exile',
    description: 'Lord Rama begins his 14-year exile to the forest on his father\'s command.',
    year: -10000,
    displayYear: 'Treta Yuga',
    category: 'mythology',
    explanation: 'The central event of the Ramayana, demonstrating Rama\'s adherence to Dharma.',
    yuga: 'treta'
  },
  {
    id: 'm3',
    title: 'Kurukshetra War',
    description: 'The great war between Pandavas and Kauravas for the throne of Hastinapura.',
    year: -5000,
    displayYear: 'Dvapara Yuga',
    category: 'mythology',
    explanation: 'The climax of the Mahabharata, where the Bhagavad Gita was spoken by Krishna to Arjuna.',
    yuga: 'dvapara'
  },
  {
    id: 'm4',
    title: 'Descent of Ganga',
    description: 'King Bhagiratha brings the celestial river Ganga to Earth through intense penance.',
    year: -12000,
    displayYear: 'Satya Yuga',
    category: 'mythology',
    explanation: 'Bhagiratha\'s ancestors needed the holy waters of Ganga for salvation, leading to her descent into Shiva\'s locks.',
    yuga: 'satya'
  },
  // History
  {
    id: 'h1',
    title: 'Indus Valley Civilization Peak',
    description: 'The height of urban planning in cities like Harappa and Mohenjo-daro.',
    year: -2500,
    displayYear: '2500 BCE',
    category: 'history',
    explanation: 'One of the world\'s earliest urban civilizations, known for its advanced drainage and grid-like streets.',
    yuga: 'kali'
  },
  {
    id: 'h2',
    title: 'Reign of Ashoka the Great',
    description: 'The Mauryan Emperor who embraced Buddhism after the Kalinga War.',
    year: -268,
    displayYear: '268 BCE',
    category: 'history',
    explanation: 'Ashoka expanded the Mauryan Empire to cover most of the Indian subcontinent before turning to non-violence.',
    yuga: 'kali'
  },
  {
    id: 'h3',
    title: 'Gupta Empire Foundation',
    description: 'The beginning of the "Golden Age" of India under Chandragupta I.',
    year: 319,
    displayYear: '319 CE',
    category: 'history',
    explanation: 'The Gupta period saw immense progress in science, mathematics, astronomy, religion, and philosophy.',
    yuga: 'kali'
  },
  {
    id: 'h4',
    title: 'Battle of Panipat (First)',
    description: 'Babur defeats Ibrahim Lodi, marking the beginning of the Mughal Empire.',
    year: 1526,
    displayYear: '1526 CE',
    category: 'history',
    explanation: 'This battle introduced gunpowder firearms and field artillery in the Indian subcontinent.',
    yuga: 'kali'
  },
  {
    id: 'h5',
    title: 'Indian Rebellion of 1857',
    description: 'The first major uprising against the British East India Company rule.',
    year: 1857,
    displayYear: '1857 CE',
    category: 'history',
    explanation: 'Often called the First War of Independence, it led to the end of Company rule and the start of the British Raj.',
    yuga: 'kali'
  },
  {
    id: 'h6',
    title: 'Indian Independence',
    description: 'India gains freedom from British rule at the stroke of midnight.',
    year: 1947,
    displayYear: '1947 CE',
    category: 'history',
    explanation: 'After decades of struggle led by figures like Mahatma Gandhi, India became a sovereign nation.',
    yuga: 'kali'
  },
  {
    id: 'h7',
    title: 'Reign of Raja Raja Chola I',
    description: 'The Chola Empire reaches its zenith, expanding into Southeast Asia.',
    year: 985,
    displayYear: '985 CE',
    category: 'history',
    explanation: 'He built the magnificent Brihadisvara Temple in Thanjavur, a masterpiece of Dravidian architecture.',
    yuga: 'kali'
  },
  {
    id: 'h8',
    title: 'Arrival of Vasco da Gama',
    description: 'The Portuguese explorer reaches Calicut, opening the sea route to India.',
    year: 1498,
    displayYear: '1498 CE',
    category: 'history',
    explanation: 'This event marked the beginning of direct European maritime trade with the Indian subcontinent.',
    yuga: 'kali'
  },
  {
    id: 'h9',
    title: 'Coronation of Shivaji Maharaj',
    description: 'The establishment of the Maratha Empire as a sovereign kingdom.',
    year: 1674,
    displayYear: '1674 CE',
    category: 'history',
    explanation: 'Shivaji challenged Mughal authority and revived Hindu political traditions in the Deccan.',
    yuga: 'kali'
  },
  {
    id: 'h10',
    title: 'Dandi March',
    description: 'Mahatma Gandhi leads a 24-day march to protest the British salt tax.',
    year: 1930,
    displayYear: '1930 CE',
    category: 'history',
    explanation: 'A pivotal moment in the Civil Disobedience Movement, drawing global attention to India\'s struggle.',
    yuga: 'kali'
  }
];
