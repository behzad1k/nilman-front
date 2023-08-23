type IProps = {
  imgSrc: string
}
export const ProfilePicture = ({imgSrc}: IProps) => {
  return (
      <span className="profilePicture">
        <img src={imgSrc}/>
      </span>
  );
};