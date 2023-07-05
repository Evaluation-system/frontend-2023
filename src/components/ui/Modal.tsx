import { FC, ReactNode, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

type Props = {
  text?: string;
  children: ReactNode;
};

const Modal: FC<Props> = ({ children, text = "Добро пожаловать!" }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(true);
  return (
    <>
      {/* {openModal ? ( */}
      <section className="modal">
        <div className="modal-content">
          <header className="flex justify-between items-center">
            <h3>{text}</h3>
            <button onClick={(): void => navigate(0)}>
              <TfiClose />
            </button>
          </header>
          {children}
        </div>
      </section>
      {/* ) : (
        ""
      )} */}
    </>
  );
};

export default Modal;
