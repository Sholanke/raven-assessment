import React from "react";
import "./index.scss";
import { SvgAngleRight, SvgGlobe, SvgLogOut, SvgLogo, SvgMenu } from "../icons";
import FormSelectDropDown from "../form-elements/form-select-dropdown";

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

          <button className="app__nav-bar__actions__desktop-logout">
            <SvgLogOut />
          </button>

          <div className="app__nav-bar__actions__mobile-menu">
            <FormSelectDropDown options={LINKS} value="exchange">
              <button>
                <SvgMenu />
              </button>
            </FormSelectDropDown>
          </div>
        </div>
      </nav>
    </div>
  );
}

const LINKS = [
  { label: "Exchange", value: "exchange" },
  { label: "Wallets", value: "wallet" },
  { label: "Roqqu Hub", value: "roqqu-hub" },
];

const MOCK_PROFILE = {
  fullName: "Olamide Sholanke",
  avatar: "/assets/images/profile-picture.png",
};
