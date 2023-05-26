import React from "react";
import { FaHeart } from "react-icons/fa";
import "./Home.css";
import fest1 from "./fest1.jpeg";
import fest2 from "./fest2.jpg";
import fest3 from "./fest3.jpg";

export default function Home() {
  return (
    <div className="all">
      <div className="container-main">
        <div className="left-block">
          <img src={fest2} alt="Photo 2" className="photo2" />
          <img src={fest1} alt="Photo 1" className="photo1" />
          <img src={fest3} alt="Photo 3" className="photo3" />
        </div>
        <div className="right-block">
          <p>
            Цей сайт призначений для інформаційної підтримки фестивалю
            мистецької самодіяльності студентів. <br></br>
            <br></br> Користувач має можливість:
            <br></br>
            <ul>
              <li>
                {" "}
                додати основну інформацію про фестиваль, таку як локація,
                ведучий, журі (5 осіб), призи та техніка. Всю введену інформацію
                можна переглянути та редагувати в розділі "Основна інформація".
              </li>
              <li>
                додати інформацію про учасника, а саме ім'я, прізвище, місто,
                завдання (обов'язкові поля), та сумарні бали за кожен тур (3
                тури). Всіх доданих учасників можна переглянути, редагувати чи
                видалити в розділі "Зареєстровані учасники", де також можна
                побачити переможців (оновлення в реальному часі).
              </li>
            </ul>
            <p>
              Після внесення та перевірки всієї необхідної інформації користувач
              може:
            </p>
            <ul>
              <li>
                вивести підсумковий звіт у форматі електронної таблиці Excel,
                натиснувши на кнопку "Згенерувати Excel".
              </li>
              <li>
                вивести підсумковий звіт у форматі XML, натиснувши на кнопку
                "Згенерувати XML".
              </li>
            </ul>
          </p>
        </div>
      </div>
      <footer className="footer">
        <div className="container-fluid">
          <p className="text">
            Copyright © {new Date().getFullYear()} All rights reserved | Is made
            with <FaHeart fontSize="0.8em" />
            <FaHeart fontSize="0.8em" color="#8B4513" /> by Vitalii Diakiv AM-33
          </p>
        </div>
      </footer>
    </div>
  );
}
