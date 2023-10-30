import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

function Episode() {
  const { mal_id } = useParams();
  const { title } = useParams();
  const [epi, setEpiTodo] = useState([]);
  const [fulls, setFull] = useState([]);
  const [videoId, setVideo] = useState([]);
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  const onReady = (event) => {
    // Handle peristiwa pemutar video yang telah siap
    event.target.playVideo();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episode = await fetch(
          `https://api.jikan.moe/v4/anime/${mal_id}/episodes`
        );

        const full = await fetch(
          `https://api.jikan.moe/v4/anime/${mal_id}/full`
        );
        if (full.ok) {
          const fullId = await full.json();
          setFull(fullId.data);
          setVideo(fullId.data.trailer);
        } else {
          console.error("Full Error");
        }

        if (episode.ok) {
          const epijs = await episode.json();
          setEpiTodo(epijs.data);
        } else {
          console.error("Data Error");
        }
      } catch (error) {
        console.error(error + "Data Error");
      }
    };
    fetchData();
  }, [mal_id, title]);

  console.log(epi);
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1  mt-5">
        <div className="video-container ">
          <YouTube videoId={videoId.youtube_id} opts={opts} onReady={onReady} />
        </div>
        <div className="border-sm px-5">
          <h1 className="text-3xl mb-4">{title}</h1>
          <h2 className="font-bold">Synopsis</h2>
          <p>{fulls.synopsis}</p>
        </div>
      </div>
      <div className="px-3 my-5">
        <hr />
      </div>
      <div className="p-3">
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-2">
          {epi.length > 0 ? (
            epi.map((item) => (
              <div
                key={item.id}
                className=" p-5 border-2 rounded-md"
                style={{
                  height: "auto",
                  minWidth: "200px",
                  maxWidth: "400px",
                }}
              >
                <div className=" grid-cols-2 gap-2 mb-2 flex justify-between">
                  <div>
                    <h1 className="text-xl">{item.title}</h1>
                    <p>{item.title_japanese}</p>
                  </div>

                  <button
                    className=" lg:mx-6 text-center rounded-md  text-white bg-slate-500"
                    style={{
                      width: "80px",
                      height: "50px",
                      lineHeight: "50px",
                    }}
                  >
                    Eps {item.mal_id}
                  </button>
                </div>
                <hr />
                <ul className="flex mt-1">
                  <li className="mr-5">
                    {new Date(item.aired).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </li>
                  <li className="mr-5">{item.score}</li>
                  <li className="mr-5">
                    <a href={item.forum_url}>Forum</a>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Episode;
