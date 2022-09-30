import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function ListMovies() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  /// khởi tạo useSate
  /// listMovies:là đơn giá trị hoặc object là tham số của useSate
  /// setLisstMovies : thay đổi listMovies là tham số của useState
  /// initialState : giá trị ban đầu của listMovies
  const [listMovies, setListMovies] = useState([]);

  const [selectedMoive, setSelectedMovie] = useState({});
  const [trailer, setTrailer] = useState({});

  //// đường dẫn của api
  const IMG_URL = "https://image.tmdb.org/t/p/w500/";
  const IMG_TRAILER = "https://image.tmdb.org/t/p/w780";
  const API_URL = "https://api.themoviedb.org/3";
  const TRAILER = "https://www.youtube.com/embed/";

  //useEffect được gọi khi components thay đổi. Mỗi lần chạy chỉ được gọi 2 lần
  // Nếu ko có  []: dependent : hàm sẽ chạy vô hạn
  useEffect(() => {
    callMovies(); /// gọi lại hàm
  }, []);

  // tạo hàm callMoives: xử lý api
  const callMovies = async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=554c83bd53b85322008ec381d0349f98"
      )
      .then((res) => {
        // console.log(res.data);
        setListMovies(res.data.results);
      });
  };

  const getTrailer = async (id) => {
    await axios
      .get(
        `${API_URL}/movie/${id}?api_key=554c83bd53b85322008ec381d0349f98&append_to_response=videos`
      )
      .then((res) => {
        setTrailer(res.data.videos);
      });
  };

  return (
    <>
      <div className="movie-container">
        <div className="movie-video">
          {/* sao chép mã nhúng trên youtube */}
          <iframe
            width="700"
            height="500"
            //// thay đổi đường dẫn
            src={`${
              trailer?.results ? `${TRAILER}${trailer?.results[0]?.key}` : ""
            }`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div
          className="movie-trailer"
          style={{
            background: ` url('${IMG_TRAILER}${selectedMoive.poster_path}') `,
          }}
        >
          {/* <div className="movie-content">
            <h1 className="movie-title">
              {selectedMoive ? selectedMoive.title : "Rong"}
            </h1>
            <p className="movie-desc font-text">
              {selectedMoive ? selectedMoive.overview : "Rong"}
            </p>
          </div> */}
        </div>
      </div>

      <div className="movie-card">
        <p className="font-text f-w700 ">Trailers</p>
        {/* slider sử dụng react slick */}
        <Slider {...settings}>
          {/* lấy giá trị listMovies duyệt qua map() */}
          {listMovies.map((item, index) => (
            <div
              key={index}
              className="movie-item"
              onClick={() => {
                setSelectedMovie(item);
                getTrailer(item.id);
              }}
            >
              {/* poster_path: lấy ảnh từ api */}
              <img src={`${IMG_URL}${item.poster_path}`} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
export default ListMovies;
