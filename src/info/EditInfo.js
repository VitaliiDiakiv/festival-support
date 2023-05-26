import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditInfo() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [info, setInfo] = useState({
    location: "",
    narrator: "",
    jury: "",
    prizes: "",
    equipment: "",
  });
  const { location, narrator, jury, prizes, equipment } = info;

  useEffect(() => {
    loadInfo();
  }, []);

  const [errors, setErrors] = useState({
    location: "",
    narrator: "",
    jury: "",
    prizes: "",
    equipment: "",
  });

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "narrator") {
      const regex = /^[a-zA-Zа-яА-ЯіїєІЇЄ' ]*$/;
      if (!regex.test(value)) {
        setErrors({
          ...errors,
          [name]:
            "Поле не може містити спеціальні символи та цифри, окрім апострофа!",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setInfo({ ...info, [name]: value });
      }
    } else if (name === "jury") {
      const regex = /^[a-zA-Zа-яА-ЯіїєІЇЄ', ]*$/;
      if (!regex.test(value)) {
        setErrors({
          ...errors,
          [name]:
            "Поле не може містити спеціальні символи та цифри, окрім апострофа та  коми!",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setInfo({ ...info, [name]: value });
      }
    } else if (name === "prizes") {
      const regex = /^[a-zA-Z0-9а-яА-ЯіїєІЇЄ', ]*$/;
      if (!regex.test(value)) {
        setErrors({
          ...errors,
          [name]:
            "Поле не може містити спеціальні символи, окрім апострофа та коми!",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setInfo({ ...info, [name]: value });
      }
    } else {
      setInfo({ ...info, [name]: value });
    }
    if (name === "location") {
      setErrors({ ...errors, location: "" });
    }

    if (name === "equipment") {
      setErrors({ ...errors, equipment: "" });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = { ...errors };

    if (location.trim() === "") {
      newErrors.location = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (narrator.trim() === "") {
      newErrors.narrator = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (jury.trim() === "") {
      newErrors.jury = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (prizes.trim() === "") {
      newErrors.prizes = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (equipment.trim() === "") {
      newErrors.equipment = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      await axios.put(`https://festival-support-backend.herokuapp.com/info/${id}`, info);
      navigate("/allinfo");
    }
  };

  const loadInfo = async () => {
    try {
      const result = await axios.get(`https://festival-support-backend.herokuapp.com/info/${id}`);
      setInfo(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
          <h2 className="text-center m-4">
            Редагування інформації про фестиваль
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Локація
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.location ? "is-invalid" : ""
                }`}
                placeholder="Введіть локацію"
                name="location"
                value={location}
                onChange={onInputChange}
              />
              {errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="narrator" className="form-label">
                Ведучий
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.narrator ? "is-invalid" : ""
                }`}
                placeholder="Введіть ведучого фестивалю"
                name="narrator"
                value={narrator}
                onChange={onInputChange}
              />
              {errors.narrator && (
                <div className="invalid-feedback">{errors.narrator}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="jury" className="form-label">
                Журі
              </label>
              <textarea
                type="text"
                style={{ height: "65px" }}
                className={`form-control ${errors.jury && "is-invalid"}`}
                placeholder="Введіть журі через кому"
                name="jury"
                value={jury}
                onChange={onInputChange}
              ></textarea>
              {errors.jury && (
                <div className="invalid-feedback">{errors.jury}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="prizes" className="form-label">
                Призи
              </label>
              <textarea
                style={{ height: "30px" }}
                className={`form-control ${errors.prizes && "is-invalid"}`}
                placeholder="Введіть призи через кому"
                name="prizes"
                value={prizes}
                onChange={onInputChange}
              ></textarea>
              {errors.prizes && (
                <div className="invalid-feedback">{errors.prizes}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="equipment" className="form-label">
                Техніка
              </label>
              <textarea
                style={{ height: "60px" }}
                className={`form-control ${
                  errors.equipment ? "is-invalid" : ""
                }`}
                placeholder="Введіть техніку через кому"
                name="equipment"
                value={equipment}
                onChange={onInputChange}
              ></textarea>
              {errors.equipment && (
                <div className="invalid-feedback">{errors.equipment}</div>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-outline-dark mx-4">
                Зберегти
              </button>
              <Link className="btn btn-outline-danger mx-4" to="/allinfo">
                Скасувати
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
