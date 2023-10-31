import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List() {
  const [kar, setKar] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const karakter = await fetch(
        "https://api.jikan.moe/v4/recommendations/anime"
      );
      if (karakter.ok) {
        const karakters = await karakter.json();
        setKar(karakters.data);
      } else {
        console.error("Error");
      }
    };
    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {kar.map((item) => (
        <div className="grid lg:grid-cols-2 gap-2">
          {item.entry.map((entryItem) => (
            <div
              key={entryItem.mal_id}
              className=" p-5 border-2 rounded-md"
              style={{
                height: "auto",
                minWidth: "200px",
                maxWidth: "400px",
              }}
            >
              <img
                className="rounded-lg"
                style={{ objectFit: "cover", width: "100%", height: "300px" }}
                src={entryItem.images.jpg.image_url}
                alt=""
                srcset=""
              />
              <div className="grid-cols-2 gap-4 mb-2 flex justify-between">
                <div>
                    <h1 className="text-xl my-4">{entryItem.title}</h1>
                  <Link to={`/episode/${entryItem.mal_id}/${entryItem.title}`} className="px-3 py-2  bg-blue-700 text-white rounded-md my-1">
                    View
                  </Link>
                  {/* <p>{item.entry.jpg.image_url}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default List;
