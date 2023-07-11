import { FC } from "react";
import TextArea from "./TextArea";
import Modal from "./Modal";
import Input from "./Input";

type Props = {
  registerInput: any;
  registerTextArea: any;

  errorMessageInput: any;
  errorMessageTextArea: any;
  handleSubmit: any;
  onSubmit: any;
  setOpenModal: any;
};

const EditProject: FC<Props> = ({
  registerInput,
  registerTextArea,

  errorMessageInput,
  errorMessageTextArea,
  handleSubmit,
  onSubmit,
  setOpenModal,
}) => {
  return (
    <Modal text="Изменить проект">
      <header className="flex justify-between items-center">
        <h3>Изменить проект</h3>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          placeholder="Новое название"
          id="newTitle"
          type="text"
          register={registerInput}
          errorMessage={errorMessageInput}
        />
        <TextArea
          placeholder="Новое описание"
          id="newDescription"
          register={registerTextArea}
          errorMessage={errorMessageTextArea}
        />
        <div className="flex gap-5 justify-center">
          <button className="btn" onClick={(): void => setOpenModal(false)}>
            Закрыть
          </button>
          <input type="submit" className="btnGradient" value="Подтвердить" />
        </div>
      </form>
    </Modal>
  );
};

export default EditProject;
