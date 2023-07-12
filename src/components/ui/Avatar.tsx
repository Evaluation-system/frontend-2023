import { FC } from "react";
import { MdMonochromePhotos } from "react-icons/md";

type Props = {
  photo?: string | undefined;
  //Сделать обязательным позже
  avatarRef?: HTMLInputElement | null;
};

const Avatar: FC<Props> = ({ photo = "../img/proj.jpg", avatarRef }) => {
  const handleAvatar = () => {
    avatarRef?.click();
  };

  return (
    <div
      className="relative w-36 h-36 rounded-full overflow-hidden"
      onClick={(): void => handleAvatar()}
    >
      <div className="absolute flex w-full h-full bg-primary z-10 top-28 opacity-80">
        <div className="mx-auto pt-2">
          <MdMonochromePhotos />
        </div>
      </div>
      <img src={photo} className="absolute rounded-full z-0" />
    </div>
  );
};

export default Avatar;
