process.env.TMDB_API_URL = "https://api.themoviedb.org/3";
process.env.TMDB_API_KEY = "test_key";
process.env.NEXT_PUBLIC_TMDB_API_IMG_URL = "https://image.tmdb.org/t/p/w300/";

if (typeof AbortSignal.timeout !== "function") {
  AbortSignal.timeout = (ms: number) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return controller.signal;
  };
}