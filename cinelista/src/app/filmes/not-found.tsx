import Link from "next/link";
import Title from "../components/Title";

const NotFound = () => {
  return (
    <>
      <Title title="Ops... Não encontramos seu filme !" />
      <p style={{ textAlign: "center", padding: "2rem" }}>
        <Link href="/">Voltar para a página inicial</Link>
      </p>
    </>
  );
};

export default NotFound;
