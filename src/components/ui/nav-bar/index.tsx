import React from "react";
import "./index.scss";
import { SvgAngleRight, SvgGlobe, SvgLogOut, SvgLogo } from "../icons";

export default function NavBar() {
  return (
    <div className="app__nav-bar-container">
      <nav className="app__container app__nav-bar">
        <div className="app__nav-bar__links">
          <SvgLogo />

          <ul className="app__nav-bar__links__list">
            <a className="active" href="/">
              Exchange
            </a>
            <a href="/">Wallets</a>
            <a href="/">Roqqu Hub</a>
          </ul>
        </div>

        <div className="app__nav-bar__actions">
          <button className="app__nav-bar__profile-btn">
            <span className="app__nav-bar__profile-btn__avatar">
              <img src={MOCK_PROFILE.avatar} alt={MOCK_PROFILE.fullName} />
            </span>
            <p>{MOCK_PROFILE.fullName}</p>
            <SvgAngleRight />
          </button>

          <button>
            <SvgGlobe />
          </button>

          <button>
            <SvgLogOut />
          </button>
        </div>
      </nav>
    </div>
  );
}

const MOCK_PROFILE = {
  fullName: "Olamide Sholanke",
  avatar: "/assets/images/profile-picture.png",
};
