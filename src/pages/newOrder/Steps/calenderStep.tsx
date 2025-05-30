import { MenuItem } from '@mui/material';
import moment from 'jalali-moment';
import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SelectInput, TextInput } from '../../../components';
import { urls } from '../../../services/endPoint';
import { api } from '../../../services/http';
import { SET_LOADING } from '../../../services/redux/reducers/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../../services/redux/store';
import globalType from '../../../types/globalType';
import comp from '../../../types/comp';
import errors from '../../../utils/errors';

export default function CalenderStep({
                                     setSelected,
                                     selected,
                                       setStep,
                                   }: comp.ICalenderStep) {
  // React
  const [schedules, setSchedules] = useState<any>(undefined);
  const [calTab, setCalTab] = useState(0);
  const {
    control,
    watch
  } = useForm();
  const watchDiscount = watch('discount') as string;
  const dispatch = useAppDispatch();

  const calender = () => {
    const tabs: ReactElement[] = [];

    for (let i = 0; i < 37; i++) {
      tabs.push(
        <div className={`calTabCell${calTab == i ? ' selected' : ''}`} onClick={() => {
          setCalTab(i);
        }}>
        <span>
        {moment().add(i, 'd').locale('fa').format('DD')}
        </span>
          <span>
        {i == 0 ? 'امروز' : i == 1 ? 'فردا' : moment().add(i, 'd').locale('fa').format('dddd')}
        </span>
        </div>
      );
    }
    
    const sections = [];
    for (let i = 8; i < 22; i = i + 2) {
      const day = moment().add(calTab, 'day').format('jYYYY/jMM/jDD');
      const disabled =
        (day == '1403/12/30') ||
        (day == '1403/12/29') ||
        (schedules && schedules[day] ? schedules[day].includes(i) : false) ||
        (!selected.isUrgent ? (calTab == 0) || (calTab == 1 && Number(moment().add(24, 'h').format('HH')) > i) : false) ||
        (calTab == 0 && Number(moment().format('HH')) > (i - 5)) ||
        (selected.isUrgent && calTab == 0 && Number(moment().format('HH')) >= 0 && Number(moment().format('HH')) < 8) && (i == 8 || i == 10)||
        (calTab == 1 && Number(moment().format('HH')) >= 16 && Number(moment().format('HH')) < 18 && i < 10) ||
        (calTab == 1 && Number(moment().format('HH')) >= 18 && i < 12);
      sections.push(<span className={`calSectionsSpan${(selected.time == i && selected.date == day) ? ' selected' : ''} ${disabled ? 'disabled' : ''}`} onClick={() => {
        if (disabled) {
          toast('تمامی استایلیست ها در این زمان مشغول می باشند', { type: 'warning' });
        } else {
          setSelected(prev => ({
            ...prev,
            time: i,
            date: day
          }));
        }

      }}>{i} - {i + 2}</span>);
    }

    const body =
      <div>
        <div className="calTabs">
          {tabs}
        </div>
        <div className="calSections">{sections}</div>
      </div>;
    return body;
  };
  const fetchWorkersOff = async (id: string = null) => {
    dispatch(SET_LOADING(true));

    const reqBody = {
      method: 'POST',
      body: { attributes: Object.keys(selected.options), addressId: selected.address?.id },
    };
    if (id) {
      reqBody.body['workerId'] = id;
    }

    const res = await api(urls.workersOffs, reqBody, true);

    if (res.code === 200) {
      setSchedules(res.data);
    } else {
      toast(errors[res.code] || 'سفارش شما ثبت نشد, لطفا مجددا تلاش کنید.', { type: 'error' })
      setStep({
        index: 2,
        name: 'address',
      })

    }
    dispatch(SET_LOADING(false));
  };

  useEffect(() => {
    fetchWorkersOff(selected?.worker);
  }, []);

  useEffect(() => {
    setSelected((prev) => ({
      ...prev,
      discount: watchDiscount
    }));
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
      {!selected.isUrgent &&
          <div className="workerUrgentBox">
              <span>جهت ثبت سفارش برای ۲۴ ساعت آینده حالت سفارش فوری را انتخاب کنید</span>
          </div>
      }
    </div>
  );
}
