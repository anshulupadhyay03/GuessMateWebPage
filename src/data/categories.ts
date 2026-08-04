import { CategoryGroup } from '../types';

export const CATEGORIES_DATA: CategoryGroup[] = [
  {
    id: 'animals',
    name: 'Animals',
    iconName: 'PawPrint',
    description: 'Wild beasts, mammals, birds, marine life, and reptiles.',
    sampleItems: ['Tiger', 'Lion', 'Elephant', 'Penguin', 'Blue Whale', 'Cheetah', 'Wolf', 'Eagle', 'Octopus', 'Chameleon', 'Kangaro', 'Panda'],
    itemCount: 250,
    popularQuestions: ['Is it warm-blooded?', 'Does it live in water?', 'Is it a carnivore?', 'Can it fly?'],
    gradient: 'from-amber-500/20 to-orange-500/20 border-amber-500/30'
  },
  {
    id: 'superheroes',
    name: 'Superheroes',
    iconName: 'Shield',
    description: 'Marvel, DC, anime heroes, and legendary comic figures.',
    sampleItems: ['Batman', 'Spider-Man', 'Iron Man', 'Wonder Woman', 'Thor', 'Superman', 'Wolverine', 'Doctor Strange', 'Flash', 'Black Panther'],
    itemCount: 180,
    popularQuestions: ['Is this character from Marvel?', 'Do they have natural superpowers?', 'Do they wear a mask?', 'Are they from Earth?'],
    gradient: 'from-rose-500/20 to-red-500/20 border-rose-500/30'
  },
  {
    id: 'cricket_players',
    name: 'Cricket Players',
    iconName: 'Trophy',
    description: 'International legends, legends from India, Australia, England & IPL stars.',
    sampleItems: ['Virat Kohli', 'MS Dhoni', 'Sachin Tendulkar', 'AB de Villiers', 'Steve Smith', 'Jasprit Bumrah', 'Ben Stokes', 'Rohit Sharma', 'Kane Williamson'],
    itemCount: 210,
    popularQuestions: ['Is he a right-handed batsman?', 'Has he captained his national team?', 'Is he a fast bowler?', 'Has he won a World Cup?'],
    gradient: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
  },
  {
    id: 'football_players',
    name: 'Football Players',
    iconName: 'Activity',
    description: 'Global icons from Premier League, La Liga, Serie A & World Cups.',
    sampleItems: ['Lionel Messi', 'Cristiano Ronaldo', 'Kylian Mbappé', 'Neymar Jr', 'Erling Haaland', 'Luka Modrić', 'Kevin De Bruyne', 'Zinedine Zidane'],
    itemCount: 220,
    popularQuestions: ['Has he won a Ballon d\'Or?', 'Does he play as a striker/forward?', 'Is he currently playing in Europe?', 'Has he won the UEFA Champions League?'],
    gradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30'
  },
  {
    id: 'cars',
    name: 'Cars & Supercars',
    iconName: 'Car',
    description: 'Luxury supercars, electric vehicles, classic sports cars, and legendary models.',
    sampleItems: ['Bugatti Chiron', 'Porsche 911', 'Ferrari F40', 'Lamborghini Aventador', 'Tesla Model S', 'Ford Mustang', 'McLaren P1', 'Nissan GT-R'],
    itemCount: 160,
    popularQuestions: ['Is it manufactured in Europe?', 'Does it accelerate 0-100 km/h in under 3 seconds?', 'Is it an electric vehicle?', 'Is it a 2-seater sports car?'],
    gradient: 'from-violet-500/20 to-purple-500/20 border-violet-500/30'
  },
  {
    id: 'brands',
    name: 'Global Brands',
    iconName: 'Tag',
    description: 'Tech giants, fashion houses, automobiles, and food empires.',
    sampleItems: ['Apple', 'Nike', 'Google', 'Coca-Cola', 'Tesla', 'Amazon', 'Adidas', 'Samsung', 'Rolex', 'McDonald\'s', 'Red Bull'],
    itemCount: 300,
    popularQuestions: ['Is it a technology company?', 'Was it founded in the USA?', 'Does it produce consumer hardware?', 'Is it in the consumer apparel sector?'],
    gradient: 'from-sky-500/20 to-indigo-500/20 border-sky-500/30'
  },
  {
    id: 'countries',
    name: 'Countries',
    iconName: 'Globe',
    description: 'Sovereign nations across Asia, Europe, Americas, Africa & Oceania.',
    sampleItems: ['Japan', 'Brazil', 'France', 'India', 'Canada', 'Australia', 'Egypt', 'Germany', 'South Korea', 'Argentina', 'Norway'],
    itemCount: 195,
    popularQuestions: ['Is it located in Asia?', 'Does it border an ocean?', 'Is its population over 50 million?', 'Does it use the Euro?'],
    gradient: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30'
  },
  {
    id: 'pokemon',
    name: 'Pokémon',
    iconName: 'Zap',
    description: 'Generation 1 to 9 pocket monsters, legendaries, and starters.',
    sampleItems: ['Pikachu', 'Charizard', 'Mewtwo', 'Gengar', 'Lucario', 'Rayquaza', 'Greninja', 'Garchomp', 'Snorlax', 'Eevee', 'Blastoise'],
    itemCount: 240,
    popularQuestions: ['Is it a Fire-type Pokémon?', 'Is it a Legendary or Mythical?', 'Does it evolve from another Pokémon?', 'Is it from Generation 1?'],
    gradient: 'from-amber-400/20 to-yellow-500/20 border-amber-400/30'
  },
  {
    id: 'space',
    name: 'Space & Astronomy',
    iconName: 'Rocket',
    description: 'Planets, stars, galaxies, rovers, and cosmic phenomena.',
    sampleItems: ['Mars', 'James Webb Telescope', 'Andromeda Galaxy', 'Saturn', 'Jupiter', 'Black Hole', 'Hubble Telescope', 'ISS', 'Apollo 11', 'Voyager 1'],
    itemCount: 130,
    popularQuestions: ['Is it located inside our Solar System?', 'Is it a man-made satellite/spacecraft?', 'Does it have rings?', 'Is it a planet?'],
    gradient: 'from-indigo-500/20 to-fuchsia-500/20 border-indigo-500/30'
  },
  {
    id: 'mythology',
    name: 'Mythology & Legends',
    iconName: 'Sparkles',
    description: 'Greek, Norse, Hindu, Egyptian, and Roman gods and mythical beasts.',
    sampleItems: ['Zeus', 'Thor', 'Odin', 'Hanuman', 'Anubis', 'Poseidon', 'Phoenix', 'Medusa', 'Hercules', 'Shiva', 'Dragon'],
    itemCount: 170,
    popularQuestions: ['Is this god from Greek mythology?', 'Is this entity associated with thunder/sky?', 'Is it a beast/creature rather than a deity?', 'Does it wield a trident or hammer?'],
    gradient: 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
  }
];

export const PUZZLE_ITEMS_BY_CATEGORY: Record<string, string[]> = {
  animals: ['Tiger', 'Lion', 'Elephant', 'Penguin', 'Blue Whale', 'Cheetah', 'Wolf', 'Eagle', 'Octopus', 'Chameleon', 'Kangaroo', 'Giant Panda', 'Polar Bear', 'Giraffe', 'Hippopotamus', 'Snow Leopard', 'Golden Eagle', 'Komodo Dragon'],
  superheroes: ['Batman', 'Spider-Man', 'Iron Man', 'Wonder Woman', 'Thor', 'Superman', 'Wolverine', 'Doctor Strange', 'The Flash', 'Black Panther', 'Captain America', 'Deadpool', 'Hulk', 'Green Lantern', 'Aquaman'],
  cricket_players: ['Virat Kohli', 'MS Dhoni', 'Sachin Tendulkar', 'AB de Villiers', 'Steve Smith', 'Jasprit Bumrah', 'Ben Stokes', 'Rohit Sharma', 'Kane Williamson', 'Shane Warne', 'Ricky Ponting', 'Babar Azam'],
  football_players: ['Lionel Messi', 'Cristiano Ronaldo', 'Kylian Mbappé', 'Neymar Jr', 'Erling Haaland', 'Luka Modrić', 'Kevin De Bruyne', 'Zinedine Zidane', 'Ronaldinho', 'Mohamed Salah', 'Virgil van Dijk'],
  cars: ['Bugatti Chiron', 'Porsche 911', 'Ferrari F40', 'Lamborghini Aventador', 'Tesla Model S', 'Ford Mustang', 'McLaren P1', 'Nissan GT-R', 'Aston Martin DB11', 'Audi R8', 'Corvette Z06'],
  brands: ['Apple', 'Nike', 'Google', 'Coca-Cola', 'Tesla', 'Amazon', 'Adidas', 'Samsung', 'Rolex', 'McDonald\'s', 'Red Bull', 'Sony', 'Ferrari', 'Microsoft', 'Netflix'],
  countries: ['Japan', 'Brazil', 'France', 'India', 'Canada', 'Australia', 'Egypt', 'Germany', 'South Korea', 'Argentina', 'Norway', 'United Kingdom', 'Italy', 'Switzerland', 'Mexico'],
  pokemon: ['Pikachu', 'Charizard', 'Mewtwo', 'Gengar', 'Lucario', 'Rayquaza', 'Greninja', 'Garchomp', 'Snorlax', 'Eevee', 'Blastoise', 'Dragonite', 'Arceus'],
  space: ['Mars', 'James Webb Telescope', 'Andromeda Galaxy', 'Saturn', 'Jupiter', 'Black Hole', 'Hubble Telescope', 'International Space Station', 'Apollo 11', 'Voyager 1', 'Neptune', 'Supernova'],
  mythology: ['Zeus', 'Thor', 'Odin', 'Hanuman', 'Anubis', 'Poseidon', 'Phoenix', 'Medusa', 'Hercules', 'Shiva', 'Minotaur', 'Pegasus']
};
