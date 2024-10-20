import { useEffect, useState, useRef, useCallback, ReactElement } from 'react';
import { MobileTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {useForm} from 'react-hook-form';
import moment from 'jalali-moment';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const [schedules, setSchedules] = useState<any>(undefined);
  const [date, setDate] = useState();
  const [calTab, setCalTab] = useState(0);
  const orderReducer = useAppSelector(state => state.orderReducer);
  const {control, watch} = useForm();
  const watchDiscount = watch('discount') as string;
  const navigate = useNavigate();
  const calender = () => {
    const tabs: ReactElement[] = [];

    for (let i = 0; i < 30; i++) {
      tabs.push(
        <div className={`calTabCell${calTab == i ? ' selected' : ''}`} onClick={() => {
          setCalTab(i)
        }}>
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
      const day = moment().add(calTab, 'day').format('jYYYY/jMM/jDD');
      const disabled =
        (schedules && schedules[day] && !selected.isUrgent ? schedules[day].includes(i) : false) ||
        (!selected.isUrgent ? (calTab == 0) || (calTab == 1 && Number(moment().add(24, 'h').format('HH')) > i) : false) ||
        (calTab == 0 && Number(moment().format('HH')) > (i - 2));
      sections.push(<span className={`calSectionsSpan${(selected.time == i && selected.date == day) ? ' selected' : ''} ${disabled ? 'disabled' : ''}`} onClick={() => {
        if (disabled){
          toast('انتخاب این زمان فقط در حالت سفارش فوری امکان پذیر می باشد.', { type: 'warning' })
        }else{
          setSelected(prev => ({ ...prev, time: i, date: day }))
        }

      }}>{i} - {i + 2}</span>)
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
  const fetchWorkersOff = async (id: string = null) => {
    const reqBody = { method: 'POST', body: { attributes: selected.attributes.map(e => e.id)}}
    if (id){
      reqBody.body['workerId'] = id
    }

    const res = await api(urls.workersOffs, reqBody, true);
    if (res.code === 200) {
      setSchedules(res.data);
    }
  };

  useEffect(() => {
    fetchWorkersOff()
  }, []);


  useEffect(() => {
    setSelected((prev) => ({...prev, discount: watchDiscount}));
  }, [watchDiscount]);

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا تاریخ و ساعت را انتخاب کنید</p>
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
        {orderReducer.orders?.filter(e => e.serviceId == selected?.service?.id)?.length > 0 &&
        <SelectInput
          name="worker"
          label="آرایشگر"
          control={control}
          defaultValue=""
          onChange={(input) => {
            setSelected(prev => ({ ...prev, worker: input.target.id }))
            fetchWorkersOff(input.target.value);
          }}
          size="medium"
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mid-pink)',
              backgroundColor: 'var(--white-pink)',
              borderRadius: '10px',
            },
          }}
        >
          {orderReducer.orders?.filter(e => e.serviceId == selected.service?.id)?.map(e => e?.worker)?.map((worker) => (
            <MenuItem key={worker?.id} value={worker?.id}>
              {worker?.name} {worker?.lastName}
            </MenuItem>
          ))}
        </SelectInput>
        }
      {!selected.isUrgent &&
        <div className='workerUrgentBox'>
            <span>جهت ثبت سفارش برای ۲۴ ساعت آینده حالت سفارش فوری را انتخاب کنید</span>
        </div>
      }
    </div>
  );
}
