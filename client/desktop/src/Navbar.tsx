import { X as CloseX, Maximize, Minus, CheckCircle, Minimize } from "react-feather"
import { appWindow } from "@tauri-apps/api/window"
import { useEffect, useState } from "react";

export function Navbar() {
  const [isMax, setIsMax] = useState(false);
  useEffect(() => {
    appWindow.isMaximized().then((r) => { setIsMax(false) })
  }, [])
  const toggleMaximize = () => {
    appWindow.toggleMaximize();
    setIsMax(!isMax);
  }
  return (
    <div className="navbar bg-base-200 w-full ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <CheckCircle />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Todo List 🚀</a>
      </div>
      <div data-tauri-drag-region className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={() => appWindow.minimize()} ><Minus /></button>
        <button className="btn btn-ghost btn-circle" onClick={() => toggleMaximize()}>
          {isMax ? <Maximize /> : <Minimize />}
        </button>
        <button className="btn btn-ghost  btn-circle" onClick={() => appWindow.close()}><CloseX className="text-red-500" /></button>
      </div>
    </div>
  );
}
