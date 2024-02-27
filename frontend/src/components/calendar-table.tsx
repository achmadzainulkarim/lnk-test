import React from 'react';

import moment from 'moment';

interface DateInfo {
  date: number;
  day: string;
  event: EmailList[] | null;
}

interface CalendarProps {
  events: EmailList[] | null,
}

interface EmailList {
  email: string,
  date: Date,
  description: string,
  createdAt: Date,
  updatedAt: Date
}

function getAllDatesAndDaysOfMonth(events: any): DateInfo[] {
  let currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const result: DateInfo[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(currentYear, currentMonth, day);
    const date = moment(currentDay).format("DD-MM-YYYY");
    const ev = events?.length > 0 || events != null ? events.filter((i: { date: moment.MomentInput; }) => moment(i.date).format("DD-MM-YYYY") == date) : null;
    const dateInfo: DateInfo = {
      date: currentDay.getDate(),
      day: currentDay.toLocaleDateString('en-US', { weekday: 'short' }),
      event: ev
    };
    result.push(dateInfo);
  }

  return result;
}

const CalendarTable: React.FC<CalendarProps> = ({ events }) => {
  const datesAndDays = getAllDatesAndDaysOfMonth(events);
  const labelTitle = moment(new Date()).format("MMMM YYYY");
  const weeks: DateInfo[][] = [];
  let currentWeek: DateInfo[] = [];

  // Add empty cells for the days before the 1st of the month
  const firstDayOfWeek = datesAndDays[0].day;
  const emptyDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(firstDayOfWeek);

  for (let i = 0; i < emptyDays; i++) {
    currentWeek.push({ date: 0, day: '', event: null });
  }

  datesAndDays.forEach((dateInfo, index) => {
    currentWeek.push(dateInfo);

    if ((index + emptyDays + 1) % 7 === 0 || index === datesAndDays.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return (
    <div>
      <h1 className='bg-white text-xl text-center'>{labelTitle}</h1>
      <div className="flex w-100 p-4 bg-white rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2">Sun</th>
              <th className="p-2">Mon</th>
              <th className="p-2">Tue</th>
              <th className="p-2">Wed</th>
              <th className="p-2">Thu</th>
              <th className="p-2">Fri</th>
              <th className="p-2">Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex} className='h-20'>
                {week.map((day, dayIndex) => (
                  <td key={dayIndex} className="border p-2 text-right w-24">
                    {day.date > 0 && (
                      <div>
                        {day.date}
                        <br />
                        {day?.event?.map((email, index) => (
                          <div key={`email-${index}`} className='text-[9px]'>
                            {email.email}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarTable;
