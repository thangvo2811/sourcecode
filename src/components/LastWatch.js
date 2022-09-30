import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function LastWatch(props) {
  const [lastWatch, setLastWatch] = useState([]);
  const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    callLastWatch();
  }, []);
  const callLastWatch = async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=554c83bd53b85322008ec381d0349f98"
      )
      .then((res) => {
        console.log(res.data.results);
        setLastWatch(res.data.results);
      });
  };
  return (
    <>
      <div className="last-watch">
        <div className="last-name">
          <div className="text-last f-w500">{props.name}</div>
          <div className="text-view f-w700">{props.view}</div>
        </div>
        <div className="last-watch-bottom">
          <div className="last-img-r">
            {lastWatch?.map((item, index) => {
              if (index <= 4) {
                return (
                  <div key={index} className="last-bottom">
                    <img
                      className="img-right-bottom"
                      src={`${IMG_PATH}${item.poster_path}`}
                    />
                    <div className="fantasy">Fantasy</div>
                    <div className="last-desc">
                      <div className="last-item font-text">
                        {item.release_date}
                      </div>
                      <div className="last-item font-text">
                        {item.vote_count}k views
                      </div>
                    </div>
                    <div className="last-name">{item.title}</div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default LastWatch;
