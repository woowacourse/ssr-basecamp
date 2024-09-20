import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/base/Modal";
import useModal from "../hooks/useModal";

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

function RootComponent() {
  const { modalActivated, toggleModal } = useModal();

  return (
    <>
      <div id="wrap">
        <Header />
        <Outlet />
        <Footer />
      </div>

      {modalActivated && <Modal onCloseButtonClick={toggleModal} />}
      <TanStackRouterDevtools />
    </>
  );
}
