import {ReactElement} from 'react';
import {ISliderCardInfo} from '../../services/types';
import {SliderCard} from './SliderCard';

type IProps = {
  title: string;
  cardInfos: ISliderCardInfo[];
};
export function Slider({title, cardInfos}: IProps) {
  const renderSliderCards = () => {
    const rows: ReactElement[] = [];

    cardInfos.map((value: ISliderCardInfo, index) => {
      rows.push(<SliderCard url={value.url} title={value.title} key={index}/>);
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
