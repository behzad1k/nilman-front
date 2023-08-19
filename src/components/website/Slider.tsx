import {ReactElement} from 'react';
import {ISliderCardInfo} from '../../services/types.ts';
import {SliderCard} from './SliderCard.tsx';

type IProps = {
  title: string;
  cardInfos: ISliderCardInfo[];
};
export function Slider({title, cardInfos}: IProps) {
  const renderSliderCards = () => {
    const rows: ReactElement[] = [];
    cardInfos.map((value: ISliderCardInfo) => {
      rows.push(<SliderCard imgSrc={value.imgSrc} title={value.title} />);
    });
    return rows;
  };
  return (
    <div className="sliderContainer">
      <h4>{title}</h4>
      <div className="sliderCardContainer">{renderSliderCards()}</div>
    </div>
  );
}
