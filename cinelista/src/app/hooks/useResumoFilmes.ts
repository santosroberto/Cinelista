import { useMemo } from "react";

export function useResumoFilmes(overview: string, max = 180) {
  return useMemo(() => {
    if (overview.length <= max) return overview;

    return overview.slice(0, max) + "...";
  }, [overview, max]);
}
