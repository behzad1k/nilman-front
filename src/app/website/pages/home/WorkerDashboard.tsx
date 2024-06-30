import moment from 'jalali-moment';
import { useEffect, useState } from 'react';
import { urls } from '../../../../services/endPoint.ts';
import { api } from '../../../../services/http.ts';
import { useAppSelector } from '../../../../services/redux/store.ts';
import { formatPrice } from '../../../../utils/utils.ts';

const WorkerDashboard = () => {
  const userReducer = useAppSelector(state => state.userReducer)
  const [salaries, setSalaries] = useState({
    day: 0,
    week: 0,
    month: 0,
  });
  const fetchData = async () => {
    const res = await Promise.all([
      api(`${urls.workerDashboard}/${userReducer.data?.id}?from=${moment().subtract(1, 'd').format('jYYYY-jMM-jDD-HH-ss')}&to=${moment().format('jYYYY-jMM-jDD-HH-ss')}` , { method: 'GET' }, true),
      api(`${urls.workerDashboard}/${userReducer.data?.id}?from=${moment().subtract(1, 'w').format('jYYYY-jMM-jDD-HH-ss')}&to=${moment().format('jYYYY-jMM-jDD-HH-ss')}` , { method: 'GET' }, true),
      api(`${urls.workerDashboard}/${userReducer.data?.id}?from=${moment().subtract(1, 'M').format('jYYYY-jMM-jDD-HH-ss')}&to=${moment().format('jYYYY-jMM-jDD-HH-ss')}` , { method: 'GET' }, true),
    ]);

    if (res.map(e => e.code == 200)) {
      setSalaries({
        day: res[0]?.data?.salary,
        week: res[1]?.data?.salary,
        month: res[2]?.data?.salary,
      });
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <main className="workerDashboardMain">
      <section className="banners">
        <div className="dashCard">
          <span>کارکرد امروز</span>
          <span>{formatPrice(salaries.day)} تومان</span>
        </div>
        <div className="dashCard">
          <span>کارکرد ۷ روز</span>
          <span>{formatPrice(salaries.week)} تومان</span>
        </div>
        <div className="dashCard">
          <span>کارکرد ۳۰ روز</span>
          <span>{formatPrice(salaries.month)} تومان</span>
        </div>
      </section>
    </main>
  );
};

export default WorkerDashboard;
