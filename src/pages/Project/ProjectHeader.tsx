import { Dispatch, FC, LegacyRef, useRef, SetStateAction } from "react";
import Avatar from "../../components/ui/Avatar";
import { BiEdit } from "react-icons/bi";
import { IProject } from "../../types/types";

type Props = {
  photo: string | undefined;
  project: IProject;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  handleUploadImage: any;
  handleImage: any;
};

const ProjectHeader: FC<Props> = ({
  project,
  photo,
  setOpenModal,
  openModal,
  handleUploadImage,
  handleImage,
}) => {
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleAvatar = () => {
    avatarRef.current?.click();
  };

  return (
    <header className="flex flex-col justify-between gap-10 p-4 mb-12">
      <div className="flex gap-5 items-center ">
        {project.pathImage ? (
          <Avatar photo={photo} handleAvatar={handleAvatar} />
        ) : (
          <Avatar handleAvatar={handleAvatar} />
        )}

        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex gap-5 items-center">
            <h2 className="overflow-hidden whitespace-nowrap text-ellipsis">
              {project.title}
            </h2>
            <span
              className="pt-1"
              onClick={(): void => setOpenModal(!openModal)}
            >
              <BiEdit />
            </span>
          </div>
          <p className="text-gray overflow-hidden text-ellipsis line-clamp-4">
            {project.description}
          </p>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={avatarRef}
          />
          <button
            className="flex"
            onClick={(): Promise<any> => handleUploadImage()}
          >
            Загрузить фото
          </button>
        </div>
      </div>
      <section className="flex flex-col gap-3 xl:flex-row xl:gap-20">
        <div className="flex flex-col gap-[10px]">
          <p className="text-gray">Стоимость: </p>
          <p>190 000₽</p>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <p className="text-gray">Сроки:</p>
          <p>22 рабочих дней (~36 календарных дней)</p>
        </div>
      </section>
    </header>
  );
};

export default ProjectHeader;
