"use client";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [editTodoId, setEditTodoId] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTodos(data.GetAllTodo);
          setLoading(false);
        });
    };
    getTodos();
  }, []);

  const HandleAddTodo = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add-todo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.findTodo);
        setTodos([...todos, data.findTodo]);
        alert("This todo is add successfully");
        setTitle("");
      });
  };

  const HandleEdit = async (id) => {
    setEditTodoId(id);
    let todo = todos.find((todo) => todo._id === id);
    setTitle(todo.title);
  };

  const HandleUpdateTodo = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/edit-todo`, {
      method: "POST",
      body: JSON.stringify({
        id: editTodoId,
        title: title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let newTodos = todos.map((item) => {
          if (item._id === editTodoId) {
            item.title =title;
          }
          return item;
        });
        setTodos(newTodos);
        setTitle("");
        setEditTodoId('')
      });
  };

  const handleDelete = async (id) => {
    // console.log(id);
    await fetch("http://localhost:3000/api/delete-todo", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let newTodo = todos.filter((item) => item._id !== id);
        setTodos(newTodo);
        alert("This todo in delete successfully");
      });
  };

  return (
    <div className=" w-[95%] md:w-1/3 mx-auto my-10 border p-1 shadow ">
      <div className="text-center  p-2">
        <p className="font-extrabold font-serif text-2xl">
          Next.js MongoDB Full Stack Todo APP
        </p>
      </div>
      <div className="flex items-center p-2 ">
        <input
          type="text"
          name="todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="todo"
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 h-12 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Add Todo"
        />

        {editTodoId ? (
          <>
            <button
              type="button"
              onClick={HandleUpdateTodo}
              className="mx-1 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2   dark:focus:ring-yellow-900"
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={HandleAddTodo}
              className="mx-1 my-2 py-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5  mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add
            </button>
          </>
        )}
      </div>
      <div className=" border rounded-lg shadow">
        <div className="text-center p-2">
          <p className="text-2xl">Todo List</p>
        </div>
        <div className="p-2 ">
          {loading === true ? (
            <>
              {" "}
              <p className="font-bold text-1xl text-gray-800">
                Loading Data......
              </p>
            </>
          ) : (
            <>
              {todos?.map((todo, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 border m-2 rounded  "
                >
                  <div className=" flex justify-start w-full">
                    <p className="font-semibold  font-serif px-3">{i + 1}</p>
                    <p className="font-semibold font-serif ">{todo.title}</p>
                  </div>
                  <div className=" flex items-center w-full justify-end">
                    <button
                      type="button"
                      onClick={() => HandleEdit(todo._id)}
                      className="mx-1 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2   dark:focus:ring-yellow-900"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(todo._id)}
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
