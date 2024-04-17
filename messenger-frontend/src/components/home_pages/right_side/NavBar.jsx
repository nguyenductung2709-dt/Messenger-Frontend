import { BsSun } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";


const NavBar = () => {
    return(
        <div className = "flex h-15 items-center justify-center top-0 mb-10">
            <BsSun size = {35} className = "basis-1/3"/>
            <div className="basis-1/3 flex flex-col items-center justify-center rounded-full">
                    <img className="w-10 rounded-full" alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            <BiLogOut size = {35} className = "basis-1/3"/>
        </div>
    )
}

export default NavBar