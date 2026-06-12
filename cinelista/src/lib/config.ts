function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  TMDB_API_URL: getEnv("TMDB_API_URL"),
  TMDB_API_KEY: getEnv("TMDB_API_KEY"),
  NEXT_PUBLIC_TMDB_API_IMG_URL: getEnv("NEXT_PUBLIC_TMDB_API_IMG_URL"),
} as const;