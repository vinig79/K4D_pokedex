interface Move {
    name: string;
    type: string;
  }
  
  interface Moves {
    Moves: Move[];
  }
  
  export default async function moveCrawler(url: string, quant: number) {
    let count: number = 0;
    const moves: Moves = { Moves: [] };
    const controller = new AbortController();
    const { signal } = controller;
  
    try {
      const response = await fetch(url, { signal });
      const data = await response.json();
  
      for (const move of data.moves) {
        if (count >= quant) {
          controller.abort();
          break; 
        }
  
        const moveResponse = await fetch(move.move.url, { signal });
        const moveData = await moveResponse.json();
        const typeName = moveData.type.name;
        moves.Moves.push({ name: move.move.name, type: typeName });
  
        count++;
        console.log(count);
      }
  
      console.log(moves);
      
      return moves;
    } catch (error) {
      console.log(error)
      return moves;
    }
  }
  