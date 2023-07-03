import { FC, ReactNode } from "react";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

type Props = {
  text?: string;
  children: ReactNode;
};

const Modal: FC<Props> = ({ children, text = "Добро пожаловать!" }) => {
  const navigate = useNavigate();

  return (
    <section className="modal">
      <div className="modal-content">
        <header className="flex justify-between items-center">
          <h3>{text}</h3>
          <button onClick={(): void => navigate("/")}>
            <TfiClose />
          </button>
        </header>
        {children}
      </div>
    </section>
  );
};

export default Modal;
