import {useRef} from 'react';
import {DeleteOutline} from '@mui/icons-material';
import {useAppSelector} from '../../../../services/redux/store';
import {IService} from '../../../../services/types';
import {Selected} from './newOrder';

type Props = {
  selected: Selected;
  setSelected: (value: (prev: Selected) => Selected) => void;
  setIsNextStepAllowed: (val: boolean) => void;
};

export default function AttributeStep({
  selected,
  setSelected,
  setIsNextStepAllowed,
}: Props) {
  const cardRef = useRef<Array<HTMLElement | null>>([]);

  const handleSelectAttribute = (index: number, attribute: IService) => {
    cardRef.current[index]?.classList.add('selected');
    !selected.attributes.includes(attribute) && setSelected((prev: Selected) => ({
      ...prev,
      attributes: [...prev.attributes, attribute],
    }));
    setIsNextStepAllowed(true);
  };

  const handleUnselectAttribute = (
    e: React.MouseEvent,
    index: number,
    attribute: IService,
  ) => {
    e.stopPropagation();
    cardRef.current[index]?.classList.remove('selected');

    setSelected((prev: Selected) => {
      const newSelectedAttrs = prev.attributes.filter(
        (selected) => selected.slug !== attribute.slug,
      );
      if (newSelectedAttrs.length === 0) setIsNextStepAllowed(false);
      return {...prev, attributes: newSelectedAttrs};
    });
  };

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا از لیست خدمات یک مورد را انتخاب کنید.</p>
      <section className="cards">
        {selected.service?.attributes?.map((attribute, index) => (
          <div
            key={attribute.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectAttribute(index, attribute)}
            className="card"
          >
            <img src={'/img/' + attribute.slug + '.png'} />
            <h2>{attribute.title}</h2>
            <DeleteOutline
              className="delete-btn"
              onClick={(e) => handleUnselectAttribute(e, index, attribute)}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
