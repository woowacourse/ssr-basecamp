import { createLazyFileRoute } from "@tanstack/react-router";
import Container from "../components/Container";
import useMovies from "../hooks/useMovies";
import { useEffect } from "react";
import useModal from "../hooks/useModal";

export const Route = createLazyFileRoute("/top-rated")({
  component: MovieListComponent,
});

function MovieListComponent() {
  const {
    focused: [, setFocusedIndex],
  } = useMovies();
  const { setModalActivated } = useModal();

  useEffect(() => {
    setFocusedIndex(2);
  }, [setFocusedIndex]);

  useEffect(() => {
    setModalActivated(false);
  }, [setModalActivated]);

  return <Container />;
}
