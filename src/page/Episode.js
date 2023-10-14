import React, { useEffect, useState } from "react";

function Episode() {
  const [epi, setEpiTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episode = await fetch(
          "https://api.jikan.moe/v4/anime/5114/episodes"
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
  },[]);

  console.log(epi);
  return (
    <div>
      <h1>Episode</h1>

      <div className="grid lg:grid-cols-2 grid-cols-1">
        <img
          className="rounded-lg border-2"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1697163286094-37facc503e83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
          alt=""
        />

        <div className="p-3">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
            <div
              className=" p-5 border-2 rounded-md"
              style={{ height: "auto", minWidth: "200px", maxWidth: "400px" }}
            >
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <h1 className="text-3xl">Title</h1>
                  <p>Title Japanase</p>
                </div>

                <a
                  href="http://"
                  className="py-5 px-3 lg:mx-6 text-center rounded-md  text-white bg-blue-700"
                >
                  Eps 01
                </a>
              </div>
              <hr />
              <ul className="flex mt-1">
                <li className="mr-5">aired</li>
                <li className="mr-5">score</li>
                <li className="mr-5">forum</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Episode;
