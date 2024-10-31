import React from "react";
import PropTypes from "prop-types";
import { userSignedIn } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del, put } from "@vercel/blob";
import { fileIsPicture } from "@/lib/utils";
import Cancel from "./Cancel";
import Delete from "./Delete";
import FileUpload from "@/components/FileUpload";
import { updateCalendar } from "@/lib/calendar";
import Repeating from "../Repeating";
import Submit from "./Submit";
import TimeParts from "./TimeParts";

const fields = [
  "name",
  "categoryId",
  "day",
  "time",
  "location",
  "picture",
  "startDate",
  "repeating",
];

const getDataFromForm = async (formData) => {
  "use server";

  const data = {};

  const throwIfMissingField = (value, field) => {
    if (value === undefined || value === null) {
      throw new Error(`Missing required field: ${field}`);
    }
  };

  for (const field of fields) {
    const value = formData.get(field);
    if (field === "picture" && value instanceof File) {
      throwIfMissingField(value, field);
      if (value.size === 0 && !fileIsPicture(value)) {
        console.error("Invalid file type or size");
        data[field] = "";
      } else {
        const contentType = value.type || "text/plain";
        const blob = await put(value.name, value, {
          contentType,
          access: "public",
        });
        data[field] = blob.url;
      }
    } else if (field === "categoryId") {
      throwIfMissingField(value, field);
      data[field] = value || "cm1quiavf0000k693uihmt6w0";
    } else if (field === "time") {
      const fields = [
        "startHour",
        "startMinute",
        "startPeriod",
        "endHour",
        "endMinute",
        "endPeriod",
      ];

      fields.forEach((field) => {
        const value = formData.get(field);
        throwIfMissingField(value, field);
        data[field] = field.includes("Period") ? value : parseInt(value, 10);
      });

      data[field] =
        `${data.startHour.toString().padStart(2, "0")}:${data.startMinute.toString().padStart(2, "0")} ${data.startPeriod} - ${data.endHour.toString().padStart(2, "0")}:${data.endMinute.toString().padStart(2, "0")} ${data.endPeriod}`;
    } else {
      throwIfMissingField(value, field);
      data[field] = value || "";
    }
    if (field === "repeating" && value !== "NEVER") {
      const endDate = formData.get("endDate");
      throwIfMissingField(endDate, "End Date");
      data.endDate = endDate;
    }
  }

  return data;
};

const EventForm = async ({ event }) => {
  const categories = await prisma.ClubCategory.findMany();

  const successRedirect = async (message) => {
    "use server";

    await updateCalendar();
    revalidatePath("/my_events/");
    revalidatePath("/");
    redirect(`/my_events/?success=${message}`);
  };

  const saveNewEvent = async (formData) => {
    "use server";

    const { user } = await userSignedIn(["admin", "clubAdmin"]);

    if (!user) {
      return;
    }

    if (!formData) {
      return;
    }

    try {
      const data = await getDataFromForm(formData);
      await prisma.ClubEvent.create({
        data: {
          ...data,
          admins: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      if (error.message.startsWith("Missing required field:")) {
        const message = "Failed to update event. " + error.message;
        redirect(`/my_events/?error=${message}`);
      } else {
        redirect(`/my_events/?error=Unable to create event`);
      }
    }

    await successRedirect("Event created");
  };

  const updateEvent = async (formData) => {
    "use server";

    const { user } = await userSignedIn(["admin", "clubAdmin"]);

    if (!user) {
      return;
    }

    if (!formData) {
      return;
    }

    try {
      const data = await getDataFromForm(formData);
      const oldEvent = await prisma.ClubEvent.findUnique({
        where: {
          id: event?.id,
        },
      });

      if (!data.picture && oldEvent.picture) {
        data.picture = oldEvent.picture;
      }

      await prisma.ClubEvent.update({
        where: {
          id: event?.id,
        },
        data,
      });
    } catch (error) {
      if (error.message.startsWith("Missing required field:")) {
        console.error(error);
        const message = "Failed to update event. " + error.message;
        redirect(`/my_events/?error=${message}`);
      } else {
        console.error(error);
        redirect(`/my_events/?error=Unable to update event`);
      }
    }

    await successRedirect("Event updated");
  };

  const deleteEvent = async () => {
    "use server";

    const { user } = await userSignedIn(["admin", "clubAdmin"]);

    if (!user) {
      return;
    }

    if (!event) {
      return;
    }

    try {
      await prisma.ClubEvent.delete({
        where: {
          id: event?.id,
        },
      });
      if (event?.picture) {
        await del(event?.picture);
      }
    } catch (error) {
      redirect(`/my_events/edit/${event?.id}?error=Unable to delete event`);
    }

    await successRedirect("Event deleted");
  };

  return (
    <main className="EventCRUD">
      <h2>{event ? "Edit" : "New"} Event</h2>
      <form className="EventCRUD" action={event ? updateEvent : saveNewEvent}>
        {fields.map((field) => {
          switch (field) {
            case "categoryId":
              return (
                <label key={field}>
                  Category:
                  <select
                    required={true}
                    name="categoryId"
                    defaultValue={event?.categoryId}
                  >
                    <option value="" hidden>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
              );
            case "day":
              return (
                <label key={field}>
                  Day:
                  <select required={true} name="day" defaultValue={event?.day}>
                    <option value="" hidden>
                      Select a day
                    </option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </label>
              );
            case "time":
              return (
                <div key={field} className="time">
                  <TimeParts event={event} type={"start"} title="Time Start:" />
                  <TimeParts event={event} type={"end"} title="Time End:" />
                </div>
              );
            case "picture":
              return (
                <FileUpload
                  key={field}
                  name={field}
                  title="Picture:"
                  accept="image/*"
                  imageUrl={event?.picture}
                />
              );
            case "startDate":
              return (
                <label key={field}>
                  Start Date:
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={
                      event?.startDate || new Date().toISOString().split("T")[0]
                    }
                    required={true}
                  />
                </label>
              );
            case "repeating":
              return (
                <Repeating
                  repeating={event?.repeating || "WEEKLY"}
                  endDate={event?.endDate}
                  key={field}
                />
              );
            default:
              return (
                <label key={field}>
                  {field === "clubName" ? "Club/Event Name" : field}:
                  <input
                    required={true}
                    type="text"
                    name={field}
                    defaultValue={event?.[field]}
                  />
                </label>
              );
          }
        })}
        <div className="buttons">
          {event && <Delete onDelete={deleteEvent} />}
          <Cancel />
          <Submit>{event ? "Update" : "Create"}</Submit>
        </div>
        <p>
          Need to add an admin?{" "}
          <a
            href={`mailto:support@qlusion.com?subject=Add%20an%20admin%20for%20event%20${event?.id}`}
          >
            Reach out
          </a>
        </p>
      </form>
    </main>
  );
};

EventForm.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventForm;
