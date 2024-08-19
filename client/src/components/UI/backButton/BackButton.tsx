import React from 'react';
import { Link } from 'react-router-dom';
import classes from "./backButton.module.css";

import backIcon from '../../../img/back-icon.svg';

const BackButton: React.FC = () => (
  <div className={classes.backButtonContainerutton}>
    <Link to={`/`}>
      <button className={classes.buttonBack}>
        <span className={classes.buttonText}>Назад</span>
        <img className={classes.buttonIcon} src={backIcon} alt="Назад" />
      </button>
    </Link>
  </div>
);

export default BackButton;