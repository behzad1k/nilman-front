import {useEffect, useState, useRef} from 'react';
import {useForm} from 'react-hook-form';
import moment from 'jalali-moment';
// @ts-ignore
import {DatePicker} from 'react-persian-datepicker';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {SelectInput} from '../../../../components';
import {IService, IUser} from '../../../../services/types';

const fakeSchedule = ['۸ - ۱۰', '۱۰ - ۱۲', '۱۴ - ۱۶', '۱۶ - ۱۸'];

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

type Props = {
  selectedService: IService | null;
  setIsNextStepAllowed: (val: boolean) => void;
  setSelectedWorkerDate: any;
};

export default function WorkerStep({
  selectedService,
  setIsNextStepAllowed,
  setSelectedWorkerDate,
}: Props) {
  const [workers, setWorkers] = useState([]);
  const [date, setDate] = useState();
  const curDate = new Date();
  const minDate = curDate.setDate(curDate.getDate() - 1);
  const defaultDate = moment(new Date());
  const cardRef = useRef<Array<HTMLElement | null>>([]);
  const {control} = useForm();

  const handleSelectDay = (index: number) => {
    cardRef.current.map((el, i) =>
      i === index ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );

    setSelectedWorkerDate({worker: 'ملیکا ارشادی', date: '۱۴۰۲/۰۶/۲۳', time: '۱۰ - ۱۲'});
    setIsNextStepAllowed(true);
  };

  useEffect(() => {
    const getWorkersList = async () => {
      if (!selectedService) return;
      const params = new URLSearchParams({
        type: 'worker',
        service: selectedService.slug,
      });
      const res = await api(urls.getUsers + '?' + params, {}, true);
      if (res.code === 200) {
        setWorkers(
          res.data.map((worker: IUser) => {
            const {name, lastName, id} = worker;
            return {slug: id, value: name + ' ' + lastName};
          }),
        );
      }
    };
    getWorkersList();
  }, [selectedService]);

  return (
    <div className="service-step-container">
      <p className="hint-text">لطفا آرایشگر مورد نظر خود را انتخاب کنید</p>
      <div className="content">
        <SelectInput
          name="worker"
          label="آرایشگر"
          control={control}
          defaultValue=""
          options={workers}
          size="medium"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mid-pink)',
              backgroundColor: 'var(--white-pink)',
              borderRadius: '10px',
            },
          }}
        />
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
        <div className="workers-schedule">
          <div className="card">
            <p className="day">
              <span>۱۲</span>
              سه شنبه
            </p>
            <div className="sections">
              {fakeSchedule.map((section, index) => {
                return (
                  <div
                    key={index}
                    ref={(el) => (cardRef.current[index] = el)}
                    onClick={() => handleSelectDay(index)}
                    className="section"
                  >
                    {section}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
