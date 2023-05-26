import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { js2xml } from "xml-js";

export default function Navbar() {
  const [infos, setInfos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadInfos();
    loadUsers();
  }, []);

  const loadInfos = async () => {
    const result = await axios.get(
      "https://festival-support-backend.herokuapp.com/infos"
    );
    const formattedInfos = result.data.flatMap((info) => {
      const prizesArray = info.prizes.split(/,\s*/);
      const juryArray = info.jury.split(/,\s*/);
      const equipmentArray = info.equipment.split(/,\s*/);

      const maxArrayLength = Math.max(
        prizesArray.length,
        juryArray.length,
        equipmentArray.length
      );

      const formattedInfo = [];
      let isFirstRow = true;

      for (let i = 0; i < maxArrayLength; i++) {
        formattedInfo.push({
          Локація: isFirstRow ? info.location : "",
          Ведучий: isFirstRow ? info.narrator : "",
          Призи: prizesArray[i] || "",
          Журі: juryArray[i] || "",
          Техніка: equipmentArray[i] || "",
        });

        isFirstRow = false;
      }

      return formattedInfo;
    });

    setInfos(formattedInfos);
  };

  const sortedUsers = [...users].sort(
    (a, b) =>
      (b["Бал І тур"] || 0) +
      (b["Бал ІІ тур"] || 0) +
      (b["Бал ІІІ тур"] || 0) -
      ((a["Бал І тур"] || 0) + (a["Бал ІІ тур"] || 0) + (a["Бал ІІІ тур"] || 0))
  );

  const topThreeWinners = sortedUsers.slice(0, 3).map((user, index) => ({
    Місце: index + 1,
    "Ім'я": user["Ім'я"],
    Прізвище: user["Прізвище"],
    "Сумарні бали":
      (user["Бал І тур"] || 0) +
      (user["Бал ІІ тур"] || 0) +
      (user["Бал ІІІ тур"] || 0),
  }));

  const loadUsers = async () => {
    const result = await axios.get(
      "https://festival-support-backend.herokuapp.com/students"
    );
    const formattedUsers = result.data.map((user) => ({
      "Ім'я": user.name,
      Прізвище: user.surname,
      Місто: user.city,
      Завдання: user.task,
      "Бал І тур": user.first_points,
      "Бал ІІ тур": user.second_points,
      "Бал ІІІ тур": user.third_points,
    }));
    setUsers(formattedUsers);
  };

  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([]);

    XLSX.utils.sheet_add_json(worksheet, infos, {
      origin: "A2",
    });

    XLSX.utils.sheet_add_json(worksheet, users, {
      origin: `A${infos.length + 5}`,
    });

    const sortedUsers = [...users].sort(
      (a, b) =>
        (b["Бал І тур"] || 0) +
        (b["Бал ІІ тур"] || 0) +
        (b["Бал ІІІ тур"] || 0) -
        ((a["Бал І тур"] || 0) +
          (a["Бал ІІ тур"] || 0) +
          (a["Бал ІІІ тур"] || 0))
    );
    const topThreeWinners = sortedUsers.slice(0, 3).map((user, index) => ({
      Місце: index + 1,
      "Ім'я": user["Ім'я"],
      Прізвище: user["Прізвище"],
      "Сумарні бали":
        (user["Бал І тур"] || 0) +
        (user["Бал ІІ тур"] || 0) +
        (user["Бал ІІІ тур"] || 0),
    }));
    XLSX.utils.sheet_add_json(worksheet, topThreeWinners, {
      origin: `H2`,
    });

    worksheet.C1 = { v: "Основна інформація та учасники" };
    worksheet.H1 = { v: "Переможці" };

    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    const columnWidths = [];
    for (let i = range.s.c; i <= range.e.c; i++) {
      let maxLength = 0;
      for (let j = range.s.r + 1; j <= range.e.r; j++) {
        const cellAddress = XLSX.utils.encode_cell({ r: j, c: i });
        const cellValue = worksheet[cellAddress]?.v || "";
        const cellLength = cellValue.toString().length;
        if (cellLength > maxLength) {
          maxLength = cellLength;
        }
      }
      const width = Math.ceil((maxLength + 2) * 1.2);
      columnWidths.push({ wch: width });
    }
    worksheet["!cols"] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Дані");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    FileSaver.saveAs(data, "Підсумковий звіт.xlsx");
  };

  const generateXML = () => {
    const xmlData = {
      elements: [
        {
          type: "element",
          name: "data",
          elements: [
            {
              type: "element",
              name: "infos",
              elements: infos.map((info) => ({
                type: "element",
                name: "info",
                elements: [
                  {
                    type: "element",
                    name: "location",
                    elements: [
                      {
                        type: "text",
                        text: info["Локація"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "narrator",
                    elements: [
                      {
                        type: "text",
                        text: info["Ведучий"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "prizes",
                    elements: [
                      {
                        type: "text",
                        text: info["Призи"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "jury",
                    elements: [
                      {
                        type: "text",
                        text: info["Журі"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "equipment",
                    elements: [
                      {
                        type: "text",
                        text: info["Техніка"],
                      },
                    ],
                  },
                ],
              })),
            },
            {
              type: "element",
              name: "users",
              elements: users.map((user) => ({
                type: "element",
                name: "user",
                elements: [
                  {
                    type: "element",
                    name: "name",
                    elements: [
                      {
                        type: "text",
                        text: user["Ім'я"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "surname",
                    elements: [
                      {
                        type: "text",
                        text: user["Прізвище"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "city",
                    elements: [
                      {
                        type: "text",
                        text: user["Місто"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "task",
                    elements: [
                      {
                        type: "text",
                        text: user["Завдання"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "first_points",
                    elements: [
                      {
                        type: "text",
                        text: user["Бал І тур"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "second_points",
                    elements: [
                      {
                        type: "text",
                        text: user["Бал ІІ тур"],
                      },
                    ],
                  },
                  {
                    type: "element",
                    name: "third_points",
                    elements: [
                      {
                        type: "text",
                        text: user["Бал ІІІ тур"],
                      },
                    ],
                  },
                ],
              })),
            },
            {
              type: "element",
              name: "winners",
              elements: [
                {
                  type: "element",
                  name: "winner",
                  elements: topThreeWinners.map((winner) => ({
                    type: "element",
                    name: "user",
                    elements: [
                      {
                        type: "element",
                        name: "place",
                        elements: [
                          {
                            type: "text",
                            text: winner["Місце"],
                          },
                        ],
                      },
                      {
                        type: "element",
                        name: "name",
                        elements: [
                          {
                            type: "text",
                            text: winner["Ім'я"],
                          },
                        ],
                      },
                      {
                        type: "element",
                        name: "surname",
                        elements: [
                          {
                            type: "text",
                            text: winner["Прізвище"],
                          },
                        ],
                      },
                      {
                        type: "element",
                        name: "total_points",
                        elements: [
                          {
                            type: "text",
                            text: winner["Сумарні бали"],
                          },
                        ],
                      },
                    ],
                  })),
                },
              ],
            },
          ],
        },
      ],
    };

    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const xml = js2xml(xmlData, options);

    const data = new Blob([xml], { type: "application/xml" });
    FileSaver.saveAs(data, "Підсумковий звіт.xml");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand btn btn-danger mx-2" to="/">
            Інформаційна підтримка фестивалю
          </Link>
          <Link className="navbar-brand" to="/allinfo">
            Oсновна інформація
          </Link>
          <Link className="navbar-brand" to="/allstudents">
            Зареєстровані учасники
          </Link>

          <Link className="btn btn-outline-light" to="/addinfo">
            Додати основну інформацію
          </Link>
          <Link className="btn btn-outline-light" to="/addstudent">
            Додати учасника
          </Link>
          <button className="btn btn-outline-light" onClick={generateExcel}>
            Згенерувати Excel
          </button>
          <button className="btn btn-outline-light" onClick={generateXML}>
            Згенерувати XML
          </button>
        </div>
      </nav>
    </div>
  );
}
