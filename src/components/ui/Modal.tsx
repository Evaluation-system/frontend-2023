import { FC, ReactNode, useState } from "react";
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
      {openModal ? (
        <section className="modal">
          <div className="modal-content">{children}</div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Modal;
