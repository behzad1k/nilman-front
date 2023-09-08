import {useRef} from 'react';
import {DeleteOutline} from '@mui/icons-material';
import {useAppSelector} from '../../../../services/redux/store';
import {IService} from '../../../../services/types';

type Props = {
  attributes: IService[];
  setSelectedAttributes: (value: (prev: IService[]) => IService[] | []) => void;
  setIsNextStepAllowed: (val: boolean) => void;
};

export default function AttributeStep({
  attributes,
  setSelectedAttributes,
  setIsNextStepAllowed,
}: Props) {
  const cardRef = useRef<Array<HTMLElement | null>>([]);

  const handleSelectAttribute = (index: number, attribute: IService) => {
    cardRef.current[index]?.classList.add('selected');

    setSelectedAttributes((prev: IService[]) => [...prev, attribute]);
    setIsNextStepAllowed(true);
  };

  const handleUnselectAttribute = (
    e: React.MouseEvent,
    index: number,
    attribute: IService,
  ) => {
    e.stopPropagation();
    cardRef.current[index]?.classList.remove('selected');

    setSelectedAttributes((prev: IService[]) => {
      const newSelectedAttrs = prev.filter(
        (selected) => selected.slug !== attribute.slug,
      );
      if (newSelectedAttrs.length === 0) setIsNextStepAllowed(false);
      return newSelectedAttrs;
    });
  };

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا از لیست خدمات یک مورد را انتخاب کنید.</p>
      <section className="cards">
        {attributes.map((attribute, index) => (
          <div
            key={attribute.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectAttribute(index, attribute)}
            className="card"
          >
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
