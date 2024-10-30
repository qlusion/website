import React from "react";
import PropTypes from "prop-types";
import Events from "@/components/Events";
import { userSignedIn } from "@/lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import Error from "@/components/Toasts/Error";
import Success from "@/components/Toasts/Success";

export default async function UserClubs({ searchParams }) {
  const message = await searchParams;
  const data = [];
  const { user } = await userSignedIn(["admin", "clubAdmin"]);

  if (!user) {
    redirect("/");
  }

  user.clubs.map((event) => {
    data.push(event);
  });

  return (
    <main>
      <h2 className="createNewEvent">
        {data.length > 0 ? "My Events" : "You have no events yet."}
        <Link className="button" href="/my_events/new">
          Create New Event
        </Link>
      </h2>
      <Success message={message.success} />
      <Error message={message.error} />
      <section className="content">
        <Events events={data} />
      </section>
    </main>
  );
}

UserClubs.propTypes = {
  searchParams: PropTypes.object,
};
