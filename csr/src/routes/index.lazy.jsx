import { createLazyFileRoute } from "@tanstack/react-router";
import Container from "../components/Container";
import useModal from "../hooks/useModal";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { setModalActivated } = useModal();

  useEffect(() => {
    setModalActivated(0);
  }, [setModalActivated]);

  return <Container />;
}
