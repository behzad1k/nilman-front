import { useEffect, useState, useRef, useCallback, ReactElement } from 'react';
import { MobileTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {useForm} from 'react-hook-form';
import moment from 'jalali-moment';
import { DatePicker } from 'zaman';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {SelectInput, TextInput} from '../../../../components';
import { useAppSelector } from '../../../../services/redux/store.ts';
import {IService, IUser} from '../../../../services/types';
import {createSchedule} from '../../../../utils/utils';
import {Selected} from './newOrder';
import {Button, MenuItem} from '@mui/material';
type ScheduleCard = {
  fromTime: number;
  toTime: number;
};

type Props = {
  selected: Selected;
  setSelected: (val: (prev: Selected) => Selected) => void;
  setIsNextStepAllowed: (val: boolean) => void;
  workers: IUser[];
  section?: number;
  nearest: any;
};

type Tab = {
  name: string;
  index: number;
};

const tabs: Tab[] = [
  {
    name: 'اولین نوبت خالی',
    index: 0,
  },
  {
    name: 'انتخاب تاریخ',
    index: 1,
  },
  {
    name: 'آرایشگر منتخب',
    index: 2,
  },
];

export default function WorkerStep({
  setSelected,
  setIsNextStepAllowed,
  workers,
  nearest,
  selected,
  section = 3,
}: Props) {
  // React
  const [schedules, setSchedules] = useState<ScheduleCard[] | []>([]);
  const [date, setDate] = useState();
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
  const [calTab, setCalTab] = useState(0);
  const [selectedSection, setSelectedSection] = useState<any>();
  const cardRef = useRef<Array<HTMLElement | null>>([]);
  const tabsRef = useRef<Array<HTMLElement | null>>([]);
  const orderReducer = useAppSelector(state => state.orderReducer);
  // Vars
  const curDate = new Date();
  const minDate = curDate.setDate(curDate.getDate() - 1);
  const defaultDate = moment(new Date());
  const {control, watch} = useForm();
  const watchWorker = watch('worker') as string;
  const watchDiscount = watch('discount') as string;
  // @ts-ignore
  const m = moment(date?._d).locale('fa');

  const times = () => {
    const rows: ReactElement[] = [];

    for (let i = 8; i <= 20; i++) {
      rows.push(
        <span
          className={"newOrderTimeSpan " + (selected.time == i ? 'selected' : '')}
          onClick={() => setSelected(prev => ({
          ...prev,
          time: i
        }))}>
          {i}
        </span>
      )
    }

    return rows;
  };
  // Handlers
  const handleSelectDay = (index: number, fromTime: number) => {
    cardRef.current.map((el, i) =>
      i === index ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );

    setSelected((prev: Selected) => ({
      ...prev,
      worker: watchWorker,
      date: moment(Intl.DateTimeFormat().format(date)).unix(),
      time: fromTime,
    }));
    setIsNextStepAllowed(true);
  };

  const handleChangeTab = (clickedTab: Tab) => {
    tabsRef.current.forEach((tab, i) => {
      if (clickedTab.index === i) {
        tab?.classList.add('selected');
        setSelectedTab(clickedTab);
      } else {
        tab?.classList.remove('selected');
      }
    });
    setSchedules([]);
  };

  const calender = () => {
    const tabs: ReactElement[] = [];

    for (let i = 0; i < 14; i++) {
      tabs.push(
        <div className={`calTabCell${calTab == i ? ' selected' : ''}`} onClick={() => setCalTab(i)}>
        <span>
        {moment().add(i, 'd').locale('fa').format('DD')}
        </span>
        <span>
        {i ==0 ? 'امروز' : i == 1 ? 'فردا' : moment().add(i, 'd').locale('fa').format('dddd')}
        </span>
      </div>
      )
    }

    const sections = []
    for (let i = 8; i < 20; i = i + 2) {
      const disabled = (i + 3) < Number(moment().format('HH')) ;
      sections.push(<span className={`calSectionsSpan${selectedSection == i ? ' selected' : ''} ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && setSelectedSection(i)}>{i} - {i + 2}</span>)
    }

    const body =
      <div>
        <div className='calTabs'>
        {tabs}
        </div>
      <div className='calSections'>{sections}</div>
      </div>
    return body;
  };

  const fetchWorkersOff = async () => {
    let query;
    // Asap mode
    if (selectedTab.index === 0) {
      return;
    }
    if (selectedTab.index === 1) {
      // only date
      query = new URLSearchParams({
        // @ts-ignore
        date: String(moment(Intl.DateTimeFormat().format(date)).unix()),
      });
    } else {
      // Date and worker
      query = new URLSearchParams({
        workerId: watchWorker,
        // @ts-ignore
        date: String(moment(Intl.DateTimeFormat().format(date)).unix()),
      });
    }

    const res = await api(urls.workersOffs + '?' + query, {}, true);
    if (res.code === 200) {
      console.log(createSchedule(section, res.data));

      setSchedules(createSchedule(section, res.data));
    }
  };

  const handleSetAsapModeData = () => {
    if (selectedTab.index === 0 && nearest) {
      const [date, time] = nearest.date.split(' ');
      const fromTime = time.split('-')[0];
      setSelected((prev: Selected) => ({
        ...prev,
        worker: nearest.workerId,
        date: moment(date, 'jYYYY/jMM/jDD').unix(),
        time: fromTime,
      }));
      setIsNextStepAllowed(true);
    }
  };
  useEffect(() => {
    handleSetAsapModeData();
  }, [nearest, selectedTab]);

  useEffect(() => {
    setSelected((prev) => ({...prev, discount: watchDiscount}));
  }, [watchDiscount]);

  return (
    <div className="service-step-container">
      <p className="hint-text">یکی از حالت های زیر را برای ادامه انتخاب کنید</p>
      <TextInput
        name="discount"
        label="کد تخفیف"
        defaultValue=""
        control={control}
        size="medium"
        sx={{
          mt: 4,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mid-pink)',
            backgroundColor: 'var(--white-pink)',
            borderRadius: '10px',
            zIndex: -1,
          },
          '& .MuiInputBase-input': {
            color: 'var(--dashboard-dark)',
          },
        }}
      />
      <p className="hint-text">
        {/* لطفا تاریخ و آرایشگر مورد نظر خود را انتخاب کنید */}
        {/* {selectedTab.index === 1 && 'لطفا تاریخ مورد نظر خود را انتخاب کنید'} */}
        {/* {selectedTab.index === 2 && 'لطفا تاریخ و آرایشگر مورد نظر خود را انتخاب کنید'} */}
      </p>
      <div className="content">
        {calender()}
      </div>
      <div>
        {orderReducer.orders.filter(e => e.serviceId == selected.service.id).length > 0 &&
        <SelectInput
          name="worker"
          label="آرایشگر"
          control={control}
          defaultValue=""
          size="medium"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mid-pink)',
              backgroundColor: 'var(--white-pink)',
              borderRadius: '10px',
            },
          }}
        >
          {orderReducer.orders?.filter(e => e.serviceId == selected.service?.id).map(e => e?.worker).map((worker) => (
            <MenuItem key={worker?.id} value={worker?.id}>
              {worker?.name} {worker?.lastName}
            </MenuItem>
          ))}
        </SelectInput>
        }
      </div>
    </div>
  );
}
