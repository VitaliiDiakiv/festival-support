import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    city: "",
    task: "",
    first_points: "",
    second_points: "",
    third_points: "",
  });
  const {
    name,
    surname,
    city,
    task,
    first_points,
    second_points,
    third_points,
  } = user;

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    city: "",
    task: "",
    first_points: "",
    second_points: "",
    third_points: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" || name === "surname" || name === "city") {
      const regex = /^[a-zA-Zа-яА-ЯіїєІЇЄ'-]*$/;
      if (!regex.test(value)) {
        setErrors({
          ...errors,
          [name]:
            "Поле не може містити спеціальні символи та цифри, окрім апострофа та дефіса!",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setUser({ ...user, [name]: value });
      }
    } else if (
      name === "first_points" ||
      name === "second_points" ||
      name === "third_points"
    ) {
      const regex = /^([0-9]|[1-4][0-9]|50)$/;
      if (value !== "" && !regex.test(value)) {
        setErrors({
          ...errors,
          [name]: "Поле має приймати значення від 0 до 50!",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setUser({ ...user, [name]: value });
      }
    } else {
      setUser({ ...user, [name]: value });
    }

    if (errors.task && name === "task") {
      setErrors({ ...errors, task: "" });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = { ...errors };

    if (name.trim() === "") {
      newErrors.name = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (surname.trim() === "") {
      newErrors.surname = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (city.trim() === "") {
      newErrors.city = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (task.trim() === "") {
      newErrors.task = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      await axios.put(`https://festival-support-backend.herokuapp.com/student/${id}`, user);
      navigate("/allstudents");
    }
  };

  const loadUser = async () => {
    const result = await axios.get(`https://festival-support-backend.herokuapp.com/student/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
          <h2 className="text-center m-4">Редагування учасника</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Ім'я
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.name && "is-invalid"}`}
                placeholder="Введіть ім'я учасника"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Surname" className="form-label">
                Прізвище
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.surname && "is-invalid"}`}
                placeholder="Введіть прізвище учасника"
                name="surname"
                value={surname}
                onChange={(e) => onInputChange(e)}
              />
              {errors.surname && (
                <div className="invalid-feedback">{errors.surname}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="City" className="form-label">
                Місто
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.city && "is-invalid"}`}
                placeholder="Введіть місто "
                name="city"
                value={city}
                onChange={(e) => onInputChange(e)}
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Task" className="form-label">
                Завдання
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.task && "is-invalid"}`}
                placeholder="Введіть завдання"
                name="task"
                value={task}
                onChange={(e) => onInputChange(e)}
              />
              {errors.task && (
                <div className="invalid-feedback">{errors.task}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="First_points" className="form-label">
                Бал I тур
              </label>
              <input
                type={"number"}
                className={`form-control ${
                  errors.first_points && "is-invalid"
                }`}
                placeholder="Введіть сумарний бал за I тур"
                name="first_points"
                value={first_points}
                onChange={(e) => onInputChange(e)}
              />
              {errors.first_points && (
                <div className="invalid-feedback">{errors.first_points}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Second_points" className="form-label">
                Бал II тур
              </label>
              <input
                type={"number"}
                className={`form-control ${
                  errors.second_points && "is-invalid"
                }`}
                placeholder="Введіть сумарний бал за II тур"
                name="second_points"
                value={second_points}
                onChange={(e) => onInputChange(e)}
              />
              {errors.second_points && (
                <div className="invalid-feedback">{errors.second_points}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Third_points" className="form-label">
                Бал III тур
              </label>
              <input
                type={"number"}
                className={`form-control ${
                  errors.third_points && "is-invalid"
                }`}
                placeholder="Введіть сумарний бал за III тур"
                name="third_points"
                value={third_points}
                onChange={(e) => onInputChange(e)}
              />
              {errors.third_points && (
                <div className="invalid-feedback">{errors.third_points}</div>
              )}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn btn-outline-dark mx-4">
                Зберегти
              </button>
              <Link
                className="btn btn btn-outline-danger mx-4"
                to="/allstudents"
              >
                Скасувати
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
