import { getTopMovies } from "./tmdb";
import { Filme } from "@/Types/types";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

test("Retorna Filmes em Destaque corretamente", async () => {
  const mockResults: Filme[] = [
    { id: 1, title: "Matrix", overview: "Um filme", poster_path: "/img.jpg", vote_average: 8.5 },
  ];
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ results: mockResults }),
  });

  const filmes = await getTopMovies();

  expect(filmes).toEqual(mockResults);
});
