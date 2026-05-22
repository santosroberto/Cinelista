import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Title from "./index";

test("Renderiza o titulo com o texto correto", async () => {
  const titulo = "Titulo";

  render(<Title title={titulo} />);

  const elemento = await screen.findByText(titulo);

  expect(elemento).toBeInTheDocument();
});
