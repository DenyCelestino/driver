"use client";

import Link from "next/link";
import LEARN from "../../../../public/learn.svg";
import TEST from "../../../../public/test.svg";
import EXAM from "../../../../public/exam.svg";
import Image from "next/image";
const rooms = [
  {
    title: "Vá e aprenda",
    subtitle: "Aprenda agora",
    route: "/lesson",
    image: LEARN,
  },
  {
    title: "Faça teste",
    subtitle: "Faça teste agora",
    route: "/test",
    image: TEST,
  },
  {
    title: "Faça Exame",
    subtitle: "Faça exame agora",
    route: "/startexame",
    image: EXAM,
  },
];

export default function Rooms() {
  return (
    <div className="rooms">
      {rooms.map((item, index) => (
        <Link href={item.route} key={index} className="room">
          <h1 className="room-title">{item.title}</h1>
          <Image
            width={100}
            height={100}
            alt={item.title}
            src={item.image}
            priority
          />

          <div className="room-subtitle">
            <span className="room-subtitle-button">{item.subtitle}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
