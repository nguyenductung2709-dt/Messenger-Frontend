import NavBar from './NavBar';
const RightSide = () => {
    return(
    <div className = "basis-2/10 flex flex-col">
        <NavBar/>
        <div className = "flex flex-col flex-g  items-center justify-center">
        <div className="w-20 rounded-full">
            <img className = " rounded-full" alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
        <p> John Doe </p>
        </div>
    </div>
    )
}

export default RightSide