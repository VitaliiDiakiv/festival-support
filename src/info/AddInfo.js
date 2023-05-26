import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddInfo() {
  let navigate = useNavigate();

  const [info, setInfo] = useState({
    location: "",
    narrator: "",
    jury: "",
    prizes: "",
    equipment: "",
  });
  const { location, narrator, jury, prizes, equipment } = info;

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
      await axios.post("https://festival-support-backend.herokuapp.com/info", info);
      navigate("/allinfo");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow ">
          <h2 className="text-center m-4">Внесення даних про фестиваль</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Location" className="form-label">
                Локація
              </label>
              <input
                type="text"
                className={`form-control ${errors.location && "is-invalid"}`}
                placeholder="Введіть місце проведення"
                name="location"
                value={location}
                onChange={(e) => onInputChange(e)}
              />
              {errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Narrator" className="form-label">
                Ведучий
              </label>
              <input
                type="text"
                className={`form-control ${errors.narrator && "is-invalid"}`}
                placeholder="Введіть ведучого"
                name="narrator"
                value={narrator}
                onChange={(e) => onInputChange(e)}
              />
              {errors.narrator && (
                <div className="invalid-feedback">{errors.narrator}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Jury" className="form-label">
                Журі
              </label>
              <textarea
                type="text"
                style={{ height: "65px" }}
                className={`form-control ${errors.jury && "is-invalid"}`}
                placeholder="Введіть журі через кому"
                name="jury"
                value={jury}
                onChange={(e) => onInputChange(e)}
              ></textarea>
              {errors.jury && (
                <div className="invalid-feedback">{errors.jury}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Prizes" className="form-label">
                Призи
              </label>
              <textarea
                style={{ height: "30px" }}
                className={`form-control ${errors.prizes && "is-invalid"}`}
                placeholder="Введіть призи через кому"
                name="prizes"
                value={prizes}
                onInput={(e) => onInputChange(e)}
              ></textarea>
              {errors.prizes && (
                <div className="invalid-feedback">{errors.prizes}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Equipment" className="form-label">
                Техніка
              </label>
              <textarea
                className={`form-control ${errors.equipment && "is-invalid"}`}
                placeholder="Введіть техніку через кому"
                name="equipment"
                value={equipment}
                onInput={(e) => onInputChange(e)}
              ></textarea>
              {errors.equipment && (
                <div className="invalid-feedback">{errors.equipment}</div>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn btn-outline-dark mx-4 "
                to="/allinfo"
              >
                Зберегти
              </button>
              <Link className="btn btn btn-outline-danger mx-4 " to="/allinfo">
                Скасувати
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
