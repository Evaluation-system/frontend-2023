import { FC } from "react";
import { MdMonochromePhotos } from "react-icons/md";

type Props = {
  photo?: string | undefined;
  //Сделать обязательным позже
  avatarRef?: React.MutableRefObject<HTMLInputElement | null>;
};

const Avatar: FC<Props> = ({ photo = "../img/proj.jpg", avatarRef }) => {
  const handleAvatar = () => {
    avatarRef?.current?.click();
  };

  return (
    <div className="relative">
      <div className="absolute rounded-full -inset-0.5 bg-gradient-to-r from-[#e84393] animate-tilt  to-[#6c5ce7] blur-md opacity-75 group-hover:opacity-100 transistion duration-200"></div>
      <div
        className="relative w-36 h-36 rounded-full overflow-hidden cursor-pointer"
        onClick={(): void => handleAvatar()}
      >
        <div className="absolute flex w-full h-full bg-primary z-10 top-28 opacity-80 object">
          <div className="mx-auto pt-2">
            <MdMonochromePhotos />
          </div>
        </div>
        <img
          src={photo}
          className="absolute rounded-full z-0 w-40 h-40 object-cover"
        />
      </div>
    </div>
  );
};

export default Avatar;
