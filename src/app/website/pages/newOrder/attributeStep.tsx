import {useRef, useState, useEffect} from 'react';
import {DeleteOutline} from '@mui/icons-material';
import { Modal } from '../../../../components';
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
  const [openModal, setOpenModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [curId, setCurId] = useState<IService | null>(null);
  const cardRef = useRef<Array<HTMLElement | null>>([]);
  const [currentService, setCurrentService] = useState(selected.service);
  const handleSelectAttribute = (index: number, attribute: IService) => {
    if (attribute.attributes && attribute.attributes?.length > 0 && attribute.attributes[0]?.attributes?.length == 0) {
      setCurId(attribute);
      setDrawerOpen(true)
    }else if(attribute.attributes && attribute.attributes.length > 0 && attribute.attributes[0]?.attributes?.length > 0){
      setCurrentService(attribute);
    }
    setIsNextStepAllowed(true);
  };
  console.log(selected.service);
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
  console.log(selected.attributes);
  return (
    <div className="service-step-container">
      <section className="cards">
        {[...currentService?.attributes].sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000))?.map((attribute, index) => (
          <div
            key={attribute.slug}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => handleSelectAttribute(index, attribute)}
            className={`card ${
              attribute.attributes.find(e => selected.attributes.map(p => p.id).includes(e.id)) ? 'selected' : ''
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
      <Modal open={openModal} setOpen={setOpenModal}>
        <i className="close-button" onClick={() => setOpenModal(false)}></i>
        <h4>{showInfo?.title}</h4>
        <p>
          {showInfo?.description}
        </p>
      </Modal>
      <SecAttrDrawer
        selected={selected}
        setSelected={setSelected}
        parent={curId}
        open={drawerOpen}
        setOpen={setDrawerOpen}
      />
    </div>
  );
}
