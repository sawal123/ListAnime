import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredTodo, setFilteredTodo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const link = await fetch("https://api.jikan.moe/v4/top/anime");
        if (link.ok) {
          const jsonLink = await link.json();
          setTodo(jsonLink.data);
        } else {
          console.error("Data Error");
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  }, []);

  // console.log(todo.length);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    filterdTodoList(event.target.value);
  };

  const filterdTodoList = (query) => {
    const filtered = todo.filter((item) => {
      return item.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredTodo(filtered);
  };
  console.log(filteredTodo);
  if (todo.length > 0) {
    return (
      <div>
        <div className="my-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border-2 lg:w-50  rounded-lg p-2"
            placeholder="Cari.."
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4  gap-2">
          {(inputValue ? filteredTodo : todo).map((item) => (
            <div
              key={item.mal_id}
              className="border-1 rounded-lg bg-slate-200 p-3"
            >
              <img
                className="rounded-lg"
                alt=""
                style={{ objectFit: "cover", width: "100%", height: "300px" }}
                src={item.images.jpg.image_url}
              />
              <div className="mt-3">
                <div className="text-left">{item.title}</div>
                <div className="text-left">{item.source}</div>
                <div className="text-left">{item.episodes}</div>
              </div>
              <div className="my-3">
                <Link
                  to={"episode"}
                  className="px-3 py-2 bg-blue-700 text-white rounded-md my-1"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    <p>Loading ..</p>;
  }
}

export default Home;
