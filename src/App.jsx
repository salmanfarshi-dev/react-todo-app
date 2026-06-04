import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";
import { RotatingLines } from "react-loader-spinner";
import { FaPenAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const db = getDatabase();
  let [input, setInput] = useState("");
  let [caption, setCaption] = useState("");
  let [arr, setArr] = useState([]);
  let [show, setShow] = useState(true);
  let [id, setId] = useState("");
  let [visiable, setVisiable] = useState(false);

  const handlesubmit = () => {
    if (!input.trim() || !caption.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    set(push(ref(db, "details/")), {
      name: input,
      caption: caption,
    });
    setInput("");
    setCaption("");
    toast.success("Successfully added");
  };

  useEffect(() => {
    const starCountRef = ref(db, "details/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setArr(arr);
    });
  }, []);

  const handledelete = (item) => {
    remove(ref(db, "details/" + item.id));
  };

  const handleedit = (item) => {
    setShow(false);
    setVisiable(true);
    setInput(item.name);
    setCaption(item.caption);
    setId(item.id);
  };

  const handleupdate = () => {
    if (!input.trim() || !caption.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    set(ref(db, "/details/" + id), {
      name: input,
      caption: caption,
    });
    setShow(true);
    setVisiable(false);
    setInput("");
    setCaption("");
  };
  return (
    <>
      <div className="bg-black w-full h-auto pb-10 flex flex-col justify-start pt-10 items-center">
        <div className="flex flex-col  bg-[#7C3AED] w-[400px] py-10 px-5  ">
          <h1 className="text-white text-4xl font-semibold text-center">
            Todo App
          </h1>
          <div className="flex flex-col gap-y-4 my-10 w-full">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Name"
              className="bg-indigo-400 rounded-md px-3 py-1 focus:outline-none focus:bg-transparent border border-transparent focus:border-gray-300 duration-300 text-white  placeholder:text-gray-300"
            />
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              placeholder="Caption"
              className="bg-indigo-400 rounded-md px-3 py-1 focus:outline-none  focus:bg-transparent border border-transparent focus:border-gray-300 duration-300 text-white placeholder:text-gray-300"
            />
          </div>

          <div className="text-center">
            {show ? (
              <button
                onClick={handlesubmit}
                className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-500 duration-300 min-w-[120px] font-medium"
              >
                {" "}
                Add Todo{" "}
              </button>
            ) : (
              <button
                onClick={handleupdate}
                className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-500 duration-300"
              >
                Update
              </button>
            )}
          </div>

          <ul>
            {arr.map((item) => {
              return (
                <div className=" border border-gray-300 py-1 px-2 w-full rounded mt-5">
                  <div className="flex items-center justify-between">
                    <li
                      className="font-semibold text-[20px] text-white"
                      key={item.id}
                    >
                      {item.name}
                    </li>
                    <div className="flex items-center gap-x-2 text-white">
                      <button
                        disabled={visiable}
                        onClick={() => handleedit(item)}
                      >
                        <FaPenAlt
                          className={` size-4 ${visiable ? "opacity-50 cursor-not-allowed" : "corsor-pointer text-white"}`}
                        />
                      </button>
                      <button
                        disabled={visiable}
                        onClick={() => handledelete(item)}
                      >
                        {" "}
                        <MdDelete
                          className={` size-4 ${visiable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        />
                      </button>
                    </div>
                  </div>
                  <li className="text-sm font-normal text-white" key={item.id}>
                    {item.caption}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}

export default App;
