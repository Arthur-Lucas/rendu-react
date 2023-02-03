import React from 'react'
import  Pastas from "../assets/pastas.png"
import Shape from "../assets/shape.png"
import  Fav from "../assets/fav.svg"
import Vegan from "../assets/vegan.svg"
import Gym from "../assets/gym.svg"

export default function Favs() {
  return (
    <div className='w-full bg-[#7A835E] min-h-screen flex items-center justify-start px-24 py-32 flex-wrap gap-custom'>
        <div className="flex flex-col  w-1/5 gap-4">
            <div className="imgs relative w-full aspect-square">
                <img className='aspect-square w-full scale-125 absolute inset-0' src={Shape} alt="" />
                <img className='aspect-square w-full absolute inset-0' src={Pastas} alt=""  />
            </div>
            <p className='text-2xl text-beige'>Olive and basil pasta</p>
            <div className="flex flex-nowrap justify-between ">
                <div className="flex flex-nowrap  gap-2">
                    <div className="rounded-full bg-[#B9C594] p-2">
                        <img className='aspect-square h-6' src={Vegan} alt="" />
                    </div>
                    <div className="rounded-full bg-[#B9C594] p-2">
                        <img className='aspect-square  h-6' src={Gym} alt="" />
                    </div>
                </div>
                <img  className='aspect-square  h-8'  src={Fav} alt=""  />
            </div>
        </div>

    </div>
  )
}
