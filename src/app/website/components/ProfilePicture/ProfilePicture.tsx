export const ProfilePicture = ({imgSrc}:any) => {
  return (
      <span className="profilePicture">
        <img src={imgSrc}/>
      </span>
  );
};