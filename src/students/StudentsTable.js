import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./StudentTable.css";

export default function StudentsTable() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [winners, setWinners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/students");
    setUsers(result.data);

    const sortedUsers = result.data.sort((a, b) => {
      const totalPointsA = a.first_points + a.second_points + a.third_points;
      const totalPointsB = b.first_points + b.second_points + b.third_points;
      return totalPointsB - totalPointsA;
    });

    const topWinners = sortedUsers.slice(0, 3);
    setWinners(topWinners);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/student/${id}`);
    loadUsers();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name} ${user.surname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container text-center">
      <div className="py-4">
        <h3>Учасники</h3>
        <div className="table-container">
          <table className="table table-bordered shadow">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ім'я</th>
                <th scope="col">Прізвище</th>
                <th scope="col">Місто</th>
                <th scope="col" className="col-3">
                  Завдання
                </th>
                <th scope="col">Бал І тур</th>
                <th scope="col">Бал ІІ тур</th>
                <th scope="col">Бал ІІІ тур</th>
                <th scope="col">
                  <div className="search-container">
                    <input
                      type="text"
                      style={{ height: "35px" }}
                      className="form-control"
                      placeholder="Пошук за прізвищем або іменем"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.city}</td>
                  <td>{user.task}</td>
                  <td>{user.first_points}</td>
                  <td>{user.second_points}</td>
                  <td>{user.third_points}</td>
                  <td>
                    <Link
                      className="btn btn-outline-dark mx-2"
                      to={`/editstudent/${user.id}`}
                    >
                      Редагувати
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
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
      <div className="container text-center">
        <h3>Переможці</h3>
        <table className="table table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>Місце</th>
              <th>Ім'я</th>
              <th>Прізвище</th>
              <th>Бали</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => (
              <tr key={winner.id}>
                <td>{index + 1}</td>
                <td>{winner.name}</td>
                <td>{winner.surname}</td>
                <td>
                  {winner.first_points +
                    winner.second_points +
                    winner.third_points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
