import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Menu() {
  const fakeData = [
    {
      title: "Home",
    },
    {
      title: "Movies",
    },
    {
      title: "TV Show",
    },
    {
      title: "Video",
    },
    {
      title: "FAQ",
    },
    {
      title: "Pricing",
    },
    {
      title: "Contact US",
    },
  ];
  const [getAllUsers, setGetALLUsers] = useState([]);
  useEffect(() => {
    callUser();
  }, []);

  const callUser = async () => {
    await axios.get("http://localhost:8000/api/get-all-user").then((res) => {
      console.log(res.data);
      setGetALLUsers(res.data);
    });
  };

  return (
    <>
      <div className="menu flex">
        <a href="#" className="menu-left flex s32px textw font-text">
          Watchflix
        </a>
        <div className="menu-middle flex">
          {fakeData.map((item, index) => {
            return (
              <a key={index} className="textw">
                {item.title}
              </a>
            );
          })}
        </div>
        <div className="menu-right flex">
          <div className="menu-right-search">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </div>
          <a href="#" className="textw font-text">
            Đăng Ký
          </a>
          <a href="#" className="textw font-text">
            Đăng nhập
          </a>
        </div>
      </div>
    </>
  );
}

export default Menu;
