import { createLazyFileRoute } from "@tanstack/react-router";
import Container from "../components/Container";
import useMovies from "../hooks/useMovies";
import useModal from "../hooks/useModal";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/now-playing")({
  component: MovieListComponent,
});

function MovieListComponent() {
  const {
    focused: [, setFocusedIndex],
  } = useMovies();
  const { setModalActivated } = useModal();

  useEffect(() => {
    setFocusedIndex(0);
  }, [setFocusedIndex]);

  useEffect(() => {
    setModalActivated(false);
  }, [setModalActivated]);

  return <Container />;
}
