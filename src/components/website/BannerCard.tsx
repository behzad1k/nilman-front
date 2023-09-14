import { ReactElement } from "react";
import { toast } from 'react-toastify';

type IProps = {
  title: string,
  description: string,
  button: string,
  icon: ReactElement
  bgColor1?: string,
  bgColor2?: string,
  // style?: Style
}
export function BannerCard({title,description,button,icon,bgColor1 = "rgb(198, 8, 148)",bgColor2 = "rgb(33, 76, 206)"}: IProps) {
    return (
        <article className="bannerCard" style={{background: `linear-gradient(282deg, ${bgColor1}, ${bgColor2})`}}>
          {icon}
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => toast('بزودی',{type: 'info'})}>
              {button}
              <i></i>
            </button>
        </article>
    )
}
