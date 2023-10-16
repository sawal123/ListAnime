import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function Episode() {
  const { mal_id } = useParams();
  const { title } = useParams();
  const [epi, setEpiTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episode = await fetch(
          `https://api.jikan.moe/v4/anime/${mal_id}/episodes`
        );
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
      <div className="px-3 my-5">
      <h1 className="text-3xl">{title}</h1>
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

                    <a
                      href="http://"
                      className=" lg:mx-6 text-center rounded-md  text-white bg-blue-700" style={{width: '80px', height: '50px', lineHeight: '50px'}}
                    >
                      Eps {item.mal_id}
                    </a>
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
