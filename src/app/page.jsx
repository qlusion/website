import React from "react";
import HomePage from "@/components/HomePage";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import MiniDashboardButtons from "@/components/MiniDashboardButtons";

export default async function Home() {
  const data = await prisma.ClubEvent.findMany({
    include: {
      category: true,
      admins: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const session = await auth();
  const user = session
    ? await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        clubs: true,
      },
    })
    : null;

  return (
    <main>
      <section className="hero">
        <h2>
          Stay Connected With Qlusion <span>Community Platform at SCU</span>
        </h2>
      </section>
      {session && user && (
        <section className="container dashboard">
          <h2>Hello, {user.name}!</h2>
          <MiniDashboardButtons user={user} />
        </section>
      )}
      <HomePage data={data} />
    </main>
  );
}
