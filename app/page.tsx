"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {Cairo} from '@next/font/google'
const cairoFont = Cairo({   weight: '400', subsets: ['latin'] })

export default function App() {
  const [lat, setLat] = useState({});
  const [long, setLong] = useState({});
  const [data, setData] = useState<any>([]);
  var today = new Date()
  const time = today.getHours() + ':' + today.getMinutes()
  const date = new Date().toLocaleDateString('en-US',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  var ampm = today.getHours() >= 12 ? 'pm' : 'am';

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=15414d5fa969db8c68f73428d0e8dd8a`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])

  const getClothingMsg = () => {
    const t = data.main.temp
    if(t>0 && t<5) return <div>
      <p><span>MATERIALS</span>: (eco) fur; feather and technical fabrics for colder temperatures.
      </p>
      <p><span>KEY PIECES</span>: a fur, a shearling coat or a classic duvet. The coat is not warm enaught.
      </p>
      <p><span>ACCESSORIES</span>: ankle boots with rubber sole, combat boots and over the knee boots. Do not forget your scarf and hat!</p>
    </div>
    else if (t>=5 && t<10) return <div>
      <p><span>MATERIALS</span>: fur and duvet will always be fine, but also cashmere will keep you warm.</p>
      <p><span>KEY PIECES</span>: short fur, parka or coat with a big collar. Under it a light sweaher, because inside it will be warm.</p>
      <p> <span>ACCESSORIES</span>: Boots or ankle boots with tights. Repair yourself with a fur collar or scarf.</p>
    </div>
    else if (t>=10 && t<15) return <div>
      <p><span>MATERIALS</span>: wool or a light duvet is just fine. It’s a bit early for a fur coat.
      </p>
      <p> <span>KEY PIECES</span>: this is the moment of the medium weight coat. Alternatively, a fur vest or a poncho.
      </p>
      <p> <span>ACCESSORIES</span>: this is the ideal time for accessories-lovers: scarves, hats, ankle boots, but also décolleté.</p>
    </div>
    else if (t>=15 && t<20) return <div>
      <p><span>MATERIALS</span>: light wool, leather, waterproof fabrics. Under them, tops and shirts in cotton and other thin fabrics.
      </p>
      <p> <span>KEY PIECES</span>: the trench coat if it is cloudy; the leather jacket if there is wind. Create your wool vest!
      </p>
      <p> <span>ACCESSORIES</span>: shoe or ankle boot, you can easily go without socks.</p>
    </div>
    else if (t>=20 && t<25) return <div>
      <p><span>MATERIALS</span>: cotton, jersey, denim. In short, light or mixed fabrics for a variable time.
      </p>
      <p> <span>KEY PIECES</span>: if the weather is not so good, wear a denim jacket or a trench; if it is sunny, a cardigan or a maxi scarf is better.
      </p>
      <p> <span>ACCESSORIES</span>: if there is sun, open shoes are fine too; otherwise, sneakers, moccasins or décolleté.</p>
    </div>
    else if (t>=25 && t<30) return <div>
      <p><span>MATERIALS</span>: cotton and other other light fabrics, with short sleeves. It’s hot even with the bad weather!
      </p>
      <p> <span>KEY PIECES</span>: a super versatile shirt; a white t-shirt; a silk blouse. Below, cotton trousers or a maxi skirt.
      </p>
      <p> <span>ACCESSORIES</span>: open sandals, but also moccasins or décolleté. Do not forget sunglasses!</p>
    </div>
    else if (t>=30) return <div>
      <p><span>MATERIALS</span>: light fabrics and baggy volumes to stay fresh. The heat has really arrived!
      </p>
      <p> <span>KEY PIECES</span>: mini or maxi dress. Indoor the air conditioning does not forgive: always bring a cardigan …
      </p>
      <p> <span>ACCESSORIES</span>: get yourself a nice hat! As for shoes, I highly recommend the open-toe ones! </p>
    </div>
  }
  const getoutfit = () => {
    const t = data.main.temp
    if(t>0 && t<5) return <Image src="/1.jpg" width={800} height={420} alt='outfit'/>
    else if (t>=5 && t<10) return <Image src="/2.jpg" width={800} height={420} alt='outfit'/>
    else if(t>=10 && t<15) return <Image src="/3.jpg" width={800} height={420} alt='outfit'/>
    else if (t>=15 && t<20) return <Image src="/4.jpg" width={800} height={420} alt='outfit'/>
    else if (t>=20 && t<25) return <Image src="/5.jpg" width={800} height={420} alt='outfit'/>
    else if (t>=25 && t<30) return  <Image src="/6.jpg" width={800} height={420} alt='outfit'/>
    else if (t>=30) return <Image src="/7.jpg" width={800} height={420} alt='outfit'/>
  }
  const weatherIcon = () => {
    // if(data.weather[0].description=="few clouds") return <Image src="/weatherIcons/few-cloud.gif" width={100} height={100} alt='outfit'/> 
    // else if (data.weather[0].description=="clear sky") return <Image src="/weatherIcons/clear.png" width={100} height={100} alt='outfit'/> 
    const path = '/weatherIcons/'+ data.weather[0].description + '.png'
    console.log(path)
    return (
      <Image src={path} width={200} height={200} alt='icon'/>
    )
  }
  return (
    <div className="h-screen md:flex" >
        {data.main ? (
          <>
          <div id="left" className="h-[60vh] md:h-screen md:w-2/3 text-3xl pt-8 grid grid-cols-2 gap-4 place-content-between px-9 ">
            <div>
              <p className=" text-7xl mb-5">{time} <span className="text-5xl uppercase">{ampm}</span></p>
              <p>{date}</p>
            </div>
            <div className="text-5xl lg:text-6xl text-end"> {data.name} </div>
           
            <div id="temp" className="flex pb-20">
              <div className="text-7xl md:text-9xl self-center">
                {Math.floor(data.main.temp)}&deg;
              </div>
              <div className="ml-5">
                <p>{weatherIcon()}</p>
                <p className="text-3xl font-semibold">{data.weather[0].description}</p> 
              </div>
            </div>
          </div>

          <div id="right" className="md:w-1/3 text-3xl pt-12">
            <p className="text-center">Recommendations</p>
            <div className=" text-xl mx-9 mt-8"> {getClothingMsg()} </div>
            <div className="mx-9 mt-8"> 
            <p className="mb-8">Outfit insporation</p>
            {getoutfit()} </div>
          </div>
          </>
         ) : 
        <h1 className=" animate-spin flex justify-between mx-auto my-auto items-center" >
             <Image src={'/load.svg'} width={200} height={200} alt='loading'/>
        </h1>
        } 
    </div>
  );

}