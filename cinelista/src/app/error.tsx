"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Algo deu errado!</h2>
      <p style={{ marginBottom: "2rem", color: "#aaa" }}>
        Ocorreu um erro inesperado. Tente novamente.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#ff4050",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Tentar novamente
      </button>
    </div>
  );
}
