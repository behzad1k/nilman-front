import {ReactElement} from 'react';
import {SliderCard} from './SliderCard';

type IProps = {
  title: string;
  cardInfos: any[];
};
export function Slider({title, cardInfos}: IProps) {
  const renderSliderCards = () => {
    const rows: ReactElement[] = [];

    cardInfos.map((value: any, index) => {
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
