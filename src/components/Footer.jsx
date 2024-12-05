import Image from "next/image";
import React from "react";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer>
      <section>
        <Image
          src="/img/SCU.webp"
          alt="Santa Clara University logo"
          width={116 * 0.75}
          height={154 * 0.75}
        />
        <p>Powered by Qlusion</p>
      </section>
      <section>
        <h2>Contact Information</h2>
        <ul>
          <li>
            <strong>Santa Clara University</strong>
          </li>
          <li>
            <strong>Address: </strong>
            <a
              href="https://maps.app.goo.gl/d6v4iuuwchSRT6tB8"
              target="_blank"
              rel="noreferrer"
            >
              500 El Camino Real
              <br /> Santa Clara, CA, 95053
            </a>
          </li>
          <li>
            <strong>Phone: </strong>
            <a href="tel:+14085544000">(408) 554-4000</a>
          </li>
        </ul>
      </section>
      <FooterLinks />
    </footer>
  );
};

export default Footer;
