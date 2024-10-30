import React from "react";
import PropTypes from "prop-types";
import EventForm from "@/components/EventCRUD/EventForm";
import { userSignedIn } from "@/lib/actions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const EditClub = async ({ params }) => {
  const data = await params;
  const { user } = await userSignedIn(["admin", "clubAdmin"]);

  if (!user) {
    redirect("/");
  }

  const event = await prisma.ClubEvent.findUnique({
    where: {
      id: data.clubID,
    },
    include: {
      admins: true,
    },
  });

  if (!event) {
    redirect("/");
  }

  const adminIds = event.admins.map((admin) => admin.id);

  if (!adminIds.includes(user.id)) {
    redirect("/");
  }

  return (
    <>
      <EventForm event={event} />
    </>
  );
};

EditClub.propTypes = {
  params: PropTypes.object.isRequired,
};

export default EditClub;
