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

export default function WorkerStep({
  selected,
  setSelected,
  setIsNextStepAllowed,
  workers,
  nearest,
  section = 3,
}: Props) {
  // React
  const [schedules, setSchedules] = useState<ScheduleCard[] | []>([]);
  const [date, setDate] = useState();
  const [mode, setMode] = useState('normal');
  const cardRef = useRef<Array<HTMLElement | null>>([]);

  // Vars
  const curDate = new Date();
  const minDate = curDate.setDate(curDate.getDate() - 1);
  const defaultDate = moment(new Date());
  const {control, watch} = useForm();
  const watchWorker = watch('worker') as string;
  // @ts-ignore
  const m = moment(date?._d).locale('fa');

  // Todo: Remove later
  const options = workers.map((worker) => {
    const {name, lastName, id} = worker;
    return {slug: id.toString(), value: name + ' ' + lastName};
  });
  options.push({slug: 'asap', value: 'سریع ترین زمان'});

  // Handlers
  const handleSelectDay = (index: number, fromTime: number) => {
    cardRef.current.map((el, i) =>
      i === index ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );

    setSelected((prev: Selected) => ({
      ...prev,
      worker: watchWorker,
      date: m.unix(),
      time: fromTime,
    }));
    setIsNextStepAllowed(true);
  };

  useEffect(() => {
    const fetchWorkersOff = async () => {
      const query = new URLSearchParams({
        workerId: watchWorker,
        // @ts-ignore
        // date: String(moment(date._d).unix()),
        date: '1694216688000',
      });
      const res = await api(urls.workersOffs + '?' + query, {}, true);
      if (res.code === 200) {
        console.log(res.data);
        setSchedules(createSchedule(section, res.data));
      }
    };
    if (watchWorker === 'asap') return setMode('asap');
    else setMode('normal');
    if (watchWorker && date) {
      fetchWorkersOff();
    }
    console.log();
  }, [watchWorker, date]);

  useEffect(() => {
    if (mode === 'asap') {
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
  }, [mode]);

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا آرایشگر مورد نظر خود را انتخاب کنید</p>
      <div className="content">
        <SelectInput
          name="worker"
          label="آرایشگر"
          control={control}
          defaultValue=""
          options={options}
          size="medium"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mid-pink)',
              backgroundColor: 'var(--white-pink)',
              borderRadius: '10px',
            },
          }}
        />
        {mode !== 'asap' ? (
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
        ) : (
          <div>
            <h3>نزدیک ترین زمان ممکن :</h3>
            <p>{nearest.date}</p>
          </div>
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
