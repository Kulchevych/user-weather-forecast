import classes from "./styles.module.scss";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { getHourlyWeather } from "../../helpers/getHourlyWeather";
import { useEffect, useState } from "react";

export function WeatherModal({ show, handleClose, weather, user }) {
  const [hourlyWeather, setHourlyWeather] = useState([]);

  useEffect(() => {
    setHourlyWeather(getHourlyWeather(weather, weather?.current.time));
  }, [weather]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className={classes.WeatherModal}
      contentClassName={classes.modalContent}
      dialogClassName={classes.dialog}
    >
      <div className={classes.content}>
        <button className={classes.closeIcon} onClick={handleClose} />
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            className={classes.map}
            defaultCenter={{ lat: weather?.latitude, lng: weather?.longitude }}
            defaultZoom={4}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={"user"}
          >
            <AdvancedMarker
              className={classes.marker}
              position={{ lat: weather?.latitude, lng: weather?.longitude }}
            >
              <div className={classes.mapUserPin} />
              <img
                className={classes.mapUserIcon}
                src={user.picture.medium}
                alt="user"
              />
              <div className={classes.positionInfo}>
                <span>latitude: {weather?.latitude}</span>
                <span>longitude: {weather?.longitude}</span>
              </div>
            </AdvancedMarker>
          </Map>
        </APIProvider>
        <div className={classes.hoursContainer}>
          <ul className={classes.hours}>
            {hourlyWeather?.map((hour) => (
              <li key={hour.time} className={classes.hour}>
                <span>{hour.date}</span>
                <span>{hour.time}</span>
                <img src={hour.weatherCode} alt="precipitation" />
                <span>{hour.temperature} &#8451;</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
