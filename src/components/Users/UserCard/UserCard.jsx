import { useCallback, useEffect, useState } from "react";

import { getWeather } from "../../../services/weather";
import { getWeatherIcon } from "../../../helpers/weatherIcon";

import { Button } from "../../Form/Button/Button";
import classes from "./styles.module.scss";
import { WeatherModal } from "../../WeatherModal/WeatherModal";

export default function UserCard({
  user,
  handleSaveUser,
  handleDeleteUser,
  readOnly,
  leftButtonDisabled,
}) {
  const [weather, setWeather] = useState(null);
  const [isModalShow, setIsModalShow] = useState(false);

  const getUserWeather = useCallback(async () => {
    const { latitude, longitude } = user.location.coordinates;

    try {
      const weatherInfo = await getWeather(latitude, longitude);
      setWeather(weatherInfo);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    getUserWeather();

    const interval = setInterval(() => {
      getUserWeather();
    }, 300000);

    return () => clearInterval(interval);
  }, [getUserWeather]);

  const handleShowModal = () => {
    setIsModalShow(true);
  };

  const handleCloseModal = () => {
    setIsModalShow(false);
  };

  return (
    <li className={classes.UserCard}>
      <div className={classes.user}>
        <img src={user.picture.medium} alt="user" />
        <div>
          <p>
            <span>Full name</span>
            {`${user.name.first} ${user.name.last}`}
          </p>
          <p>
            <span>Gender</span>
            {user.gender}
          </p>
          <p>
            <span>Mail</span>
            {user.email}
          </p>
          <p>
            <span>Location</span>
            {`${user.location.country} - ${user.location.city}`}
          </p>
        </div>
      </div>

      {weather && (
        <div className={classes.weather}>
          <div className={classes.currentWeather}>
            <img
              src={getWeatherIcon(
                weather?.current.weather_code,
                weather?.current.time
              )}
              alt="precipitation"
            />
            <span>{Math.round(weather?.current.temperature_2m)} &#8451;</span>
          </div>
          <div className={classes.minmax}>
            <span>
              max: {Math.round(weather?.daily.temperature_2m_max[0])}&deg;
            </span>
            <span>
              min:&nbsp; {Math.round(weather?.daily.temperature_2m_min[0])}&deg;
            </span>
          </div>
        </div>
      )}

      <div className={classes.buttons}>
        {!readOnly && (
          <Button
            label="Save"
            onClick={handleSaveUser}
            disabled={leftButtonDisabled}
          />
        )}
        <Button label="Weather" onClick={handleShowModal} />
      </div>

      {readOnly && (
        <button className={classes.deleteButton} onClick={handleDeleteUser} />
      )}
      <WeatherModal
        show={isModalShow}
        handleClose={handleCloseModal}
        weather={weather}
        user={user}
      />
    </li>
  );
}
