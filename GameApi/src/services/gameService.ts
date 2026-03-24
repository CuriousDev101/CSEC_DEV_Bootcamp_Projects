interface Game {
  id: number;
  name: string;
  price: number;
}

let games: Game[] = [
  { id: 1, name: "FIFA 24", price: 60 },
  { id: 2, name: "Call of Duty", price: 70 },
  { id: 3, name: "Minecraft", price: 30 }
];

export const getAllGames = () => {
  return games;
};

export const getGameById = (id: number) => {
  return games.find(g => g.id === id);
};

export const createNewGame = (name: string, price: number) => {
  const newGame = {
    id: games.length + 1,
    name,
    price
  };

  games.push(newGame);

  return newGame;
};

export const updateExistingGame = (id: number, data: Partial<Game>) => {
  const game = games.find(g => g.id === id);

  if (!game) return null;

  if (data.name) game.name = data.name;
  if (data.price) game.price = data.price;

  return game;
};

export const deleteExistingGame = (id: number) => {
  const index = games.findIndex(g => g.id === id);

  if (index === -1) return null;

  return games.splice(index, 1)[0];
};
