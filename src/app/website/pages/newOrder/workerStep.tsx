import {useEffect, useState, useRef, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import moment from 'jalali-moment';
// @ts-ignore
import {DatePicker} from 'react-persian-datepicker';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {SelectInput} from '../../../../components';
import {IService, IUser} from '../../../../services/types';
import {createSchedule} from '../../../../utils/utils';
import {Selected} from './newOrder';
import {Button, MenuItem} from '@mui/material';

const styles = {
  calendarContainer: 'calendarContainer',
  dayPickerContainer: 'dayPickerContainer',
  monthsList: 'monthsList',
  daysOfWeek: 'daysOfWeek',
  dayWrapper: 'dayWrapper',
  selected: 'selected',
  heading: 'heading',
  next: 'next',
  prev: 'prev',
  title: 'title',
};

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
    name: 'سریع‌ترین زمان ممکن',
    index: 0,
  },
  {
    name: 'فقط تاریخ',
    index: 1,
  },
  {
    name: 'تاریخ و آرایشگر',
    index: 2,
  },
];

export default function WorkerStep({
  setSelected,
  setIsNextStepAllowed,
  workers,
  nearest,
  section = 3,
}: Props) {
  // React
  const [schedules, setSchedules] = useState<ScheduleCard[] | []>([]);
  const [date, setDate] = useState();
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);
  const cardRef = useRef<Array<HTMLElement | null>>([]);
  const tabsRef = useRef<Array<HTMLElement | null>>([]);

  // Vars
  const curDate = new Date();
  const minDate = curDate.setDate(curDate.getDate() - 1);
  const defaultDate = moment(new Date());
  const {control, watch} = useForm();
  const watchWorker = watch('worker') as string;
  // @ts-ignore
  const m = moment(date?._d).locale('fa');

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

  return (
    <div className="service-step-container">
      <p className="hint-text">یکی از حالت های زیر را برای ادامه انتخاب کنید</p>
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            className={`tab ${tab.index === 0 && 'selected'}`}
            ref={(el) => (tabsRef.current[tab.index] = el)}
            onClick={() => handleChangeTab(tab)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <p className="hint-text">لطفا آرایشگر مورد نظر خود را انتخاب کنید</p>
      <div className="content">
        {selectedTab.index === 0 ? (
          <div>
            <h3>نزدیک ترین زمان ممکن :</h3>
            <p>{nearest?.date}</p>
          </div>
        ) : (
          <>
            <div className="app-date-picker">
              <DatePicker
                value={date}
                min={minDate}
                calendarStyles={styles}
                // @ts-ignore
                onChange={(value) => setDate(value)}
                defaultValue={defaultDate}
              />
            </div>
            {selectedTab.index === 2 && (
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
                {workers.map((worker) => (
                  <MenuItem key={worker.id} value={worker.id}>
                    {worker.name} {worker.lastName}
                  </MenuItem>
                ))}
              </SelectInput>
            )}
            <Button variant="contained" size="large" onClick={() => fetchWorkersOff()}>
              دریافت برنامه زمانی
            </Button>
          </>
        )}

        {schedules.length > 0 && (
          <div className="workers-schedule">
            <div className="card">
              <p className="day">
                <span>{m.format('dddd')}</span>
                <span>{m.format('D')}</span>
                <span>{m.format('MMMM')}</span>
              </p>
              <div className="sections">
                {schedules.map((section, index) => (
                  <div
                    key={index}
                    ref={(el) => (cardRef.current[index] = el)}
                    onClick={() => handleSelectDay(index, section.fromTime)}
                    className="section"
                  >
                    {`${section.fromTime} - ${section.toTime}`}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
