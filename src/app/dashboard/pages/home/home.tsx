import { MenuItem, Paper, Select, Typography } from '@mui/material';
import moment from 'jalali-moment';
import { useEffect, useState } from 'react';
import { urls } from '../../../../services/endPoint.ts';
import { api } from '../../../../services/http.ts';
import { IUser } from '../../../../services/types.ts';
import { formatPrice } from '../../../../utils/utils.ts';

export default function Home() {
  const [worker, setWorker] = useState(undefined);
  const [workers, setWorkers] = useState([]);
  const [salaries, setSalaries] = useState({
    day: 0,
    week: 0,
    month: 0,
  });
  const fetchData = async () => {
    const res = await Promise.all([
      api(`${urls.sales}?from=${moment().subtract(1, 'd').format('jYYYY-jMM-jDD-HH-ss')}&to=${moment().format('jYYYY-jMM-jDD-HH-ss')}${worker ? '&worker=' + worker : ''}`, { method: 'GET' }, true),
      api(`${urls.sales}?from=${moment().subtract(1, 'w').format('jYYYY-jMM-jDD-HH-ss')}&to=${moment().format('jYYYY-jMM-jDD-HH-ss')}${worker ? '&worker=' + worker : ''}`, { method: 'GET' }, true),
      api(`${urls.sales}?from=${moment().subtract(1, 'M').format('jYYYY-jMM-jDD-HH-ss')}&to=${moment().format('jYYYY-jMM-jDD-HH-ss')}${worker ? '&worker=' + worker : ''}`, { method: 'GET' }, true),
    ]);
    if (res.map(e => e.code == 200)) {
      setSalaries({
        day: res[0]?.data?.salary,
        week: res[1]?.data?.salary,
        month: res[2]?.data?.salary,
      });
    }
  };

  const getWorkersList = async () => {
    const params = new URLSearchParams({
      type: 'worker',
    });
    const res = await api(urls.adminUser + '?' + params, {}, true);
    if (res.code === 200) {
      setWorkers(res.data);
    }
  };

  useEffect(() => {
    if (worker) {
      fetchData()
    }
  }, [worker]);

  useEffect(() => {
    fetchData();
    getWorkersList();
  }, []);

  return (
    <>
      <Select
        size="small"
        onChange={(input) => setWorker(input.target.value)}
        value={worker}

        label={'آمار مربوط به کاربر'}
      >
        <MenuItem value={undefined}>آمار کل</MenuItem>
        {workers.map((worker: IUser) => (
          <MenuItem key={worker.id} value={worker.id}>
            {worker.name} {worker.lastName}
          </MenuItem>
        ))}
      </Select>
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          gap: 1,
        }}
      >
        <Typography component="p" variant="h4" fontWeight="700">
          {formatPrice(salaries.month)}
        </Typography>
        <Typography component="h1" variant="body2">
          درامد ۳۰ روز
        </Typography>
      </Paper>{' '}
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          gap: 1,
        }}
      >
        <Typography component="p" variant="h4" fontWeight="700">
          {formatPrice(salaries.week)}
        </Typography>
        <Typography component="h1" variant="body2">
          درامد ۷ روز
        </Typography>
      </Paper>{' '}
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          gap: 1,
        }}
      >
        <Typography component="p" variant="h4" fontWeight="700">
          {formatPrice(salaries.day)}
        </Typography>
        <Typography component="h1" variant="body2">
          درامد امروز
        </Typography>
      </Paper>
    </>
  );
}
