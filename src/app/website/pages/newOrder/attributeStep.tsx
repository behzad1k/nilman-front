import {useRef, useState, useEffect} from 'react';
import {DeleteOutline} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Modal } from '../../../../components';
import {useAppSelector} from '../../../../services/redux/store';
import {IService} from '../../../../services/types';
import { findAncestors, findRootCount } from '../../../../utils/utils.ts';
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
  const [curId, setCurId] = useState<IService | null>(null);
  const [stepCounter, setStepCounter] = useState(0);
  const services = useAppSelector(state => state.serviceReducer.allServices)
  const cardRef = useRef<Array<HTMLElement | null>>([]);
  const handleSelectAttribute = (index: number, attribute: IService) => {
    if (attribute.attributes && attribute.attributes?.length > 0 && attribute.openDrawer) {
      if (selected.attributes.length == 0){
        setCurId(attribute);
        setDrawerOpen(true);
      }
      else if (!attribute.parent.isMulti && !selected.attributes.map(e => findAncestors(services, e.id)).flat(1).map(e => e.id).includes(attribute.id)){
        toast(`انتخاب بیش از یک خدمت در ${attribute.parent.title} مجاز نمی باشد`, {type: 'error'})
      }else{
        // console.log(selected.attributes.map(e => findAncestors(services, e.id)));
        // console.log(selected.attributes.find(e => services.find(j => j?.id == e.parent?.id)?.parent.id == attribute.parent.id));
        // if (selected.attributes.find(e => services.find(j => j?.id == e.parent?.id)?.parent.id == attribute.parent.id)){
          // && !selected.attributes.map(e => findAncestors(services, e.id)).flat(1).map(e => e.id).includes(attribute.id)){
        //   toast(`انتخاب بیش از یک خدمت در ${attribute.parent.title} مجاز نمی باشد`, {type: 'error'})
        // }else {
          setCurId(attribute);
          setDrawerOpen(true);
        // }
      }
      // if (attribute.parent.isMulti
      //   && selected.attributes.find(e => services.find(j => j?.id == e.parent?.id)?.parent.id == attribute.parent.id)
      //   && !selected.attributes.map(e => findAncestors(services, e.id)).flat(1).map(e => e.id).includes(attribute.id)
      // ){
      //   toast(`انتخاب بیش از یک خدمت در ${attribute.parent.title} مجاز نمی باشد`, {type: 'error'})
      // }else{
      //   setCurId(attribute);
      //   setDrawerOpen(true);
      //   // setIsNextStepAllowed(true);
      // }
    }else if(attribute.attributes && attribute.attributes.length > 0 && attribute.attributes[0]?.attributes?.length > 0){
      setStepCounter(prev => prev + 1)
      setSelected( prev => ({ ...prev, attributeStep: attribute }))
    }
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
    setSelected((prev: Selected) => {
      const newSelectedAttrs = prev.attributes.filter(
        (selected) => !slugsToRemove.includes(selected.slug),
      );
      if (newSelectedAttrs.length === 0) setIsNextStepAllowed(false);
      return {...prev, attributes: newSelectedAttrs};
    });
  };

  useEffect(() => {
    if (!drawerOpen) setCurId(null);
  }, [drawerOpen]);

  useEffect(() => {
    if (selected.attributes?.length > 0) setIsNextStepAllowed(true);
    else setIsNextStepAllowed(false);
  }, []);

  return (
    <div className="service-step-container">
      <section className="cards">
        {[...(selected?.attributeStep || selected?.service)?.attributes || []]?.sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000))?.map((attribute, index) => (
          <div
            key={attribute.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectAttribute(index, attribute)}
            className={`card ${
              attribute.attributes?.find(e => selected?.attributes?.map(p => p.id)?.includes(e.id)) ? 'selected' : ''
            } ${index % 2 == 0 ? 'reversed' : ''}`}
          >
            <img src={'/img/' + attribute.slug + '.png'} />
            <p className='attributeTitle'>{attribute.title}</p>
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
