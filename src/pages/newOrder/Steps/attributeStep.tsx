import { DeleteOutline } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../services/redux/store';
import comp from '../../../types/comp';
import globalType from '../../../types/globalType';
import { findAncestors } from '../../../utils/utils';
import SecAttrDrawer from '../Drawers/secAttrDrawer';
import IAttributeStep = comp.IAttributeStep;

export default function AttributeStep({
                                        selected,
                                        setSelected,
                                        setIsNextStepAllowed,
                                      }: IAttributeStep) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [curId, setCurId] = useState<globalType.Service | null>(null);
  const [stepCounter, setStepCounter] = useState(0);
  const services = useAppSelector(state => state.serviceReducer.allServices);
  const cardRef = useRef<Array<HTMLElement | null>>([]);
  const handleSelectAttribute = (index: number, attribute: globalType.Service) => {
    if (attribute.attributes && attribute.attributes?.length > 0 && attribute.openDrawer) {
      if (selected.attributes.length == 0) {
        setCurId(attribute);
        setDrawerOpen(true);
      } else if (!attribute.parent.isMulti && !selected.attributes.map(e => findAncestors(services, e.id)).flat(1).map(e => e.id).includes(attribute.id)) {
        toast(`انتخاب بیش از یک خدمت در ${attribute.parent.title} مجاز نمی باشد`, { type: 'error' });
      } else {
        setCurId(attribute);
        setDrawerOpen(true);
      }
    } else if (attribute.attributes && attribute.attributes.length > 0 && attribute.attributes[0]?.attributes?.length > 0) {
      setStepCounter(prev => prev + 1);
      setSelected(prev => ({
        ...prev,
        attributeStep: attribute
      }));
    }
  };

  const handleUnselectAttribute = (
    e: React.MouseEvent,
    index: number,
    attribute: globalType.Service,
  ) => {
    e.stopPropagation();
    cardRef.current[index]?.classList.remove('selected');

    let slugsToRemove = [attribute.id];
    if (attribute.attributes) {
      slugsToRemove = [...slugsToRemove, ...attribute.attributes.map((atr) => atr.id)];
    }
    setSelected((prev: globalType.Form) => {
      const cp = { ...prev };
      slugsToRemove.map(e => delete cp.options[e]);
      if (Object.keys(cp).length === 0) setIsNextStepAllowed(false);
      return cp;
    });
  };

  useEffect(() => {
    if (!drawerOpen) setCurId(null);
  }, [drawerOpen]);

  useEffect(() => {
    if (Object.keys(selected.options)?.length > 0) setIsNextStepAllowed(true);
    else setIsNextStepAllowed(false);
  }, [JSON.stringify(selected.options)]);

  return (
    <div className="service-step-container">
      <section className="cards">
        {[...(selected?.attributeStep || selected?.service)?.attributes || []]?.filter(e => e.showInList).sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000))?.map((attribute, index) => (
          <div
            key={attribute.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectAttribute(index, attribute)}
            className={`card ${
              Object.keys(selected.options)?.find(e => attribute.id.toString() == e || findAncestors(services, e)?.map(k => k?.id)?.includes(attribute.id)) ? 'selected' : ''
            } ${index % 2 == 0 ? 'reversed' : ''}`}
          >
            <img src={'/img/' + attribute.slug + '.png'}/>
            <p className="attributeTitle">{attribute.title}</p>
            <DeleteOutline
              className="delete-btn"
              onClick={(e) => handleUnselectAttribute(e, index, attribute)}
            />
          </div>
        ))}
      </section>
      <SecAttrDrawer
        selected={selected}
        setSelected={setSelected}
        parent={curId}
        open={drawerOpen}
        setOpen={setDrawerOpen}
        setIsNextStepAllowed={setIsNextStepAllowed}
      />
    </div>
  );
}
