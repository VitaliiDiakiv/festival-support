import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InfoTable.css";
import { Link, useParams } from "react-router-dom";

export default function InfoTable() {
  const [infos, setInfos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadInfos();
  }, []);

  const loadInfos = async () => {
    const result = await axios.get(
      "https://festival-support-backend.herokuapp.com/infos"
    );
    setInfos(result.data);
  };

  const deleteInfo = async (id) => {
    await axios.delete(
      `https://festival-support-backend.herokuapp.com/info/${id}`
    );
    loadInfos();
  };

  return (
    <div className="container text-center">
      <div className="py-4">
        <h3>Основна інформація</h3>
        <div className="table-container">
          <table className="table table-bordered shadow w-auto">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col" className="col-2">
                  Локація
                </th>
                <th scope="col" className="col-md-auto">
                  Ведучий
                </th>
                <th scope="col" className="col-2">
                  Журі
                </th>
                <th scope="col" className="col-2">
                  Призи
                </th>
                <th scope="col" className="col-2">
                  Техніка
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {infos.map((info, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{info.location}</td>
                  <td>{info.narrator}</td>
                  <td>{info.jury}</td>
                  <td className="info">{info.prizes}</td>
                  <td className="info">{info.equipment}</td>
                  <td>
                    <Link
                      className="btn btn-outline-dark mx-1"
                      to={`/editinfo/${info.id}`}
                    >
                      Редагувати
                    </Link>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => deleteInfo(info.id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
