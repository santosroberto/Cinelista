import { renderHook } from "@testing-library/react";
import { useResumoFilmes } from "./useResumoFilmes";

test("Retorna overview inteiro se menor que o limite", () => {
  const texto = "Resumo Curto";
  const { result } = renderHook(() => useResumoFilmes(texto, 256));

  expect(result.current).toBe(texto);
});

test("Retorna oveview cortado e reticências se passar do limite", () => {
  const texto =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const { result } = renderHook(() => useResumoFilmes(texto, 10));
  expect(result.current).toBe("Lorem ipsu...");
});
