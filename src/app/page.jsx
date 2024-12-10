import React from "react";
import HomePage from "@/components/HomePage";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const data = await prisma.ClubEvent.findMany({
    include: {
      category: true,
      admins: true,
    },
  });

  return (
    <main>
      <section className="hero">
        <h2>
          Stay Connected With Qlusion <span>Community Platform at SCU</span>
        </h2>
      </section>
      <HomePage data={data} />
    </main>
  );
}
