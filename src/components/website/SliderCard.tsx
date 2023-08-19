import {ISliderCardInfo} from '../../services/types';

export function SliderCard({imgSrc, title}: ISliderCardInfo) {
  return (
    <div className="sliderCard" style={{backgroundImage: `url(${imgSrc})`}}>
      <span>
        <p>{title}</p>
        <i></i>
      </span>
    </div>
  );
}
