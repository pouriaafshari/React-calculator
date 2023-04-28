import { useEffect, useState } from 'react';
import { ACTIONS } from "./App"

function HighlightButton({ dispatch, digit })
{
    const [bgColor, setBgColor] = useState('rgb(0, 0, 0, 0)')
    const [isHovered, setisHovered] = useState(false)
    const [mousePos, setMousePos] = useState({});

    useEffect(() => {

        if (!isHovered) 
        {
            setBgColor('rgb(0, 0, 0, 0)')
            return
        }

        const originalColor = 'rgb(0, 0, 0, 0)'
        const lightColor = 'white'
        const gradientSize = 100

        const handleMouseMove = (event) => {
            const localX = event.clientX - event.target.offsetLeft
            const localY = event.clientY - event.target.offsetTop
            setMousePos({ x: localX, y: localY })
        }

        window.addEventListener('mousemove', handleMouseMove)

        const xy = mousePos.x + ' ' + mousePos.y
        setBgColor(
            '-webkit-gradient(radial, ' + xy + ', 0, ' + xy + ', ' + gradientSize + ', from(' + lightColor + '), to(rgba(255,255,255,0.0))), ' + originalColor
        )
    })

    

    return(
        <button
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
            style={{ background: bgColor }} 
            className="HB" 
            onMouseEnter={() => setisHovered(true)} 
            onMouseLeave={() => setisHovered(false)}>
            {digit}
        </button>
    )
}

export default HighlightButton;