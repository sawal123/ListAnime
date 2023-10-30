import React, { useEffect, useState } from "react";

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
    <div>
      <div className="grid lg:grid-cols-6 gap-1">
        {kar.map((item) => (
          <div
            key={item.mal_id}
            className=" p-5 border-2 rounded-md"
            style={{
              height: "auto",
              minWidth: "200px",
              maxWidth: "400px",
            }}
          >
            <div className=" grid-cols-2 gap-4 mb-2 flex justify-between">
              <div>
                <h1 className="text-xl">{item.entry[0].title}</h1>
                {/* <p>{item.title_japanese}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
