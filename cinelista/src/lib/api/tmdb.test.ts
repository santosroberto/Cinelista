import tmdbApi from "./axios";
import { getTopMovies } from "./tmdb";

jest.mock("./axios");

test("Retorna Filmes em Destaque corretamente", async () => {
  //AAA
  //Arrange
  const mockResults = [{ id: 1, title: "Matrix" }];
  (tmdbApi.get as jest.Mock).mockResolvedValue({
    data: { results: mockResults },
  });

  //Act
  const filmes = await getTopMovies();

  //Assert
  expect(filmes).toEqual(mockResults);
});
