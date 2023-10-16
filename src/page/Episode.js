import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function Episode() {
  const { mal_id } = useParams();
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
  }, [mal_id]);

  console.log(epi);
  return (
    <div>
      <h1>Episode</h1>
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
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <h1 className="text-xl">{item.title}</h1>
                      <p>{item.title_japanese}</p>
                    </div>

                    <a
                      href="http://"
                      className="py-5 px-3 lg:mx-6 text-center rounded-md  text-white bg-blue-700"
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
