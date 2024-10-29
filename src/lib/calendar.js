import { ICalCalendar, ICalEventRepeatingFreq } from "ical-generator";
import { prisma } from "@/lib/prisma";

const getSeparator = (time) => {
  try {
    if (time.includes("-")) {
      return "-";
    }
    if (time.includes("–")) {
      return "–";
    }
    if (time.includes("to")) {
      return "to";
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
};

const getHoursAndMinutes = (time, init) => {
  if (!/\d/.test(time)) return null;

  let [hours, minutes] = time
    .split(":")
    .map((str) => str.replace(/\D/g, ""))
    .map(Number);

  if (init.toLowerCase().includes("pm") && hours < 12) {
    hours += 12;
  } else if (init.toLowerCase().includes("am") && hours === 12) {
    hours = 0;
  }

  return {
    hours,
    minutes: minutes || 0,
  };
};

const convertTo24HourFormat = (time) => {
  const separator = getSeparator(time);
  const [startPart, endPart] = time
    .split(separator ? separator : " ")
    .map((part) => part.trim().toLowerCase());

  const startTime = getHoursAndMinutes(startPart, time);
  const endTime = endPart ? getHoursAndMinutes(endPart, time) : null;

  return {
    startTime,
    endTime:
      endTime ||
      (startTime && {
        hours: startTime.hours + 1,
        minutes: startTime.minutes,
      }),
  };
};

export async function generateCalendar() {
  const events = await prisma.clubEvent.findMany({
    include: { category: true },
  });

  const calendar = new ICalCalendar({
    name: "Qlusion",
    description: "Santa Clara University club events registered on Qlusion",
    timezone: "America/Los_Angeles",
    prodId: {
      company: "Qlusion",
      product: "Qlusion Calendar",
    },
  });

  events.forEach((event) => {
    const timeString = event.time.trim().toLowerCase();
    const { startTime, endTime } = convertTo24HourFormat(timeString);
    const dayMapping = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    if (startTime === null || endTime === null) {
      console.log(
        `Error: Invalid time format for event: ${event.name} - ID: ${event.id}`,
      );
      return;
    }

    const currentYear = new Date().getFullYear();
    const jan1st = new Date(currentYear, 0, 1);
    const firstEventOffset = (dayMapping[event.day] - jan1st.getDay() + 7) % 7;
    const start = new Date(jan1st);
    start.setDate(jan1st.getDate() + firstEventOffset);
    start.setHours(startTime.hours, startTime.minutes, 0);
    if (start < new Date()) {
      start.setDate(start.getDate() + 7);
    }
    const end = new Date(start);
    end.setHours(endTime.hours, endTime.minutes, 0);
    const repeatUntil = new Date(currentYear, 11, 31);
    calendar.createEvent({
      start,
      end,
      summary: event.name,
      location: event.location,
      description: `Category: ${event.category.name}`,
      repeating: {
        freq: ICalEventRepeatingFreq.WEEKLY,
        until: repeatUntil,
      },
    });
  });

  return calendar;
}

export async function updateCalendar() {
  const calendar = await generateCalendar();
  const icsData = calendar.toString();

  const feed = await prisma.ics_feed.upsert({
    where: { id: "default" },
    update: { content: icsData },
    create: { id: "default", content: icsData },
  });

  return feed;
}