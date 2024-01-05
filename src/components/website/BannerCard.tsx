import {ReactElement} from 'react';
import {toast} from 'react-toastify';

type IProps = {
  title?: string;
  description?: string;
  button?: string;
  icon?: ReactElement;
  bgColor1?: string;
  bgColor2?: string;
  children?: React.ReactNode;
};
export function BannerCard({
  title,
  description,
  button,
  icon,
  bgColor1 = '#6D678E',
  bgColor2 = '#F6B5CC',
  children,
}: IProps) {
  return (
    <article
      className="bannerCard"
      style={{background: `linear-gradient(282deg, ${bgColor1}, ${bgColor2})`}}
    >
      {icon}
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {children}
      {button && (
        <button onClick={() => toast('بزودی', {type: 'info'})}>
          {button}
          <i></i>
        </button>
      )}
    </article>
  );
}
