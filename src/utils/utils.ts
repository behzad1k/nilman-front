type WorkerOff = {
  date: number;
  fromTime: number;
  id: number;
  orderId: null | number;
  toTime: number;
  workerId: number;
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

  const scheduleCards: string[] = [];
  freeHours.forEach((hour) => {
    if (freeHoursSet.has(hour + length)) scheduleCards.push(`${hour} - ${hour + length}`);
  });

  return scheduleCards;
}
