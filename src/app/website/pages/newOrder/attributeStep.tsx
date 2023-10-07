import {useRef, useState, useEffect} from 'react';
import {DeleteOutline} from '@mui/icons-material';
import {useAppSelector} from '../../../../services/redux/store';
import {IService} from '../../../../services/types';
import {Selected} from './newOrder';
import SecAttrDrawer from './secAttrDrawer';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [curId, setCurId] = useState<null | number>(null);
  const cardRef = useRef<Array<HTMLElement | null>>([]);

  const handleSelectAttribute = (index: number, attribute: IService) => {
    cardRef.current[index]?.classList.add('selected');
    // !selected.attributes.includes(attribute) && setSelected((prev: Selected) => ({
    //   ...prev,
    //   attributes: [...prev.attributes, attribute],
    // }));
    if (attribute.attributes && attribute.attributes.length > 0) {
      setDrawerOpen(true)
      setCurId(attribute.id)
    }
    setIsNextStepAllowed(true);
  };

  const handleUnselectAttribute = (
    e: React.MouseEvent,
    index: number,
    attribute: IService,
  ) => {
    e.stopPropagation();
    cardRef.current[index]?.classList.remove('selected');

    let slugsToRemove = [attribute.slug];
    if (attribute.attributes) {
      slugsToRemove = [...slugsToRemove, ...attribute.attributes.map((atr) => atr.slug)];
    }
    console.log(slugsToRemove);
    setSelected((prev: Selected) => {
      const newSelectedAttrs = prev.attributes.filter(
        (selected) => !slugsToRemove.includes(selected.slug)
      );
      if (newSelectedAttrs.length === 0) setIsNextStepAllowed(false);
      return {...prev, attributes: newSelectedAttrs};
    });
  };

  useEffect(() => {
    if (!drawerOpen) setCurId(null)
  }, [drawerOpen])

  useEffect(() => {
    if (selected.attributes?.length > 0) setIsNextStepAllowed(true)
    else setIsNextStepAllowed(false)
  }, [])

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا از لیست خدمات یک مورد را انتخاب کنید.</p>
      <section className="cards">
        {selected.service?.attributes?.map((attribute, index) => (
          <div
            key={attribute.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectAttribute(index, attribute)}
            className={`card ${selected.attributes.includes(attribute) ? 'selected' : null}`}
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
      <SecAttrDrawer selected={selected} setSelected={setSelected} parentId={curId} open={drawerOpen} setOpen={setDrawerOpen} />
    </div>
  );
}
