type WorkerOff = {
  date: number;
  fromTime: number;
  id: number;
  orderId: null | number;
  toTime: number;
  workerId: number;
} | any;

type ScheduleCard = {
  fromTime: number;
  toTime: number;
};

export const formatPrice = (value: number | string) =>
  Intl.NumberFormat().format(value as number);

export function createSchedule(length: number, workerOff: WorkerOff[]) {
  const start = 8;
  const end = 23;

  const allHours: number[] = Array.from(
    {length: end - start + 1},
    (_, index) => index + start,
  );
  const busyHours: number[] = [];
  workerOff.forEach((item) => {
    let i = item.fromTime;
    while (i <= item.toTime) {
      busyHours.push(i);
      i++;
    }
  });
  const busySet = new Set(busyHours);

  const freeHours: number[] = allHours.filter((hour) => !busySet.has(hour));
  const freeHoursSet = new Set(freeHours);

  const scheduleCards: ScheduleCard[] = [];
  freeHours.forEach((hour) => {
    if (freeHoursSet.has(hour + length))
      scheduleCards.push({fromTime: hour, toTime: hour + length});
  });

  return scheduleCards;
}

export const isEmpty = (obj) => {
  return Object.keys(obj)?.length == 0;
}
