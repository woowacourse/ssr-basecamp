import { createFileRoute } from "@tanstack/react-router";
import Container from "../components/Container";
import useModal from "../hooks/useModal";
import { useEffect } from "react";

export const Route = createFileRoute("/detail/$id")({
  component: DetailComponent,
});

function DetailComponent() {
  const { id } = Route.useParams();

  const { setMovieId, setModalActivated } = useModal();

  useEffect(() => {
    setModalActivated(true);
    setMovieId(id);
  }, [id]);

  return (
    <>
      <Container />
    </>
  );
}
