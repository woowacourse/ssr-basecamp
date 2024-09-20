import { useState } from "react";
import Modal from "./components/base/Modal";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function App() {
  const [modalActivated, setModalActivated] = useState(false);

  const toggleModal = () => {
    setModalActivated(!modalActivated);
  };

  return (
    <>
      <div id="wrap">
        <Header />
        <Container />
        <Footer />
      </div>

      {modalActivated && <Modal onCloseButtonClick={toggleModal} />}
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
