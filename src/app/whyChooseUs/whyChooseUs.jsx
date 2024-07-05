"use client";
import React, { useEffect, useState } from "react";
import "./whyChooseUs.css";
import { MdArrowBackIos } from "react-icons/md";
import axios from "axios";
import Image from "next/image";

const WhyChooseUs = () => {
  const [state, setState] = useState();
  const [activeItems, setActiveItems] = useState(0);
  const [image, setimage] = useState(state?.attributes?.images);

  const [title, setTitle] = useState("Industry Experts");
const images =  ["/laptop.jpg" ,  "/gatwick_bg.jpg" ,  "/london_city_bg.jpg" ,"/about_banner.jpg","/laptop.jpg"]  


  const [buttons, setButtons] = useState(null);

  useEffect(() => {
    let token =
      "af3c2d2842b5cc04db363e07eee586c8eda32b6554dc0814da1be224965a5d8dfda50ca26618e582a68d51f04310b00482dc8c24df8a8f104128059fb1e8e40ad12d1cd13dce6c581884e8eddc2b1ba0b54b683adecef45d89f5385326212aec9e691d8d31048d29580e1338a9f22371f9b88030fedcca5a90ed021c0ec5d640";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };


    axios
      .get(
        "http://localhost:1337/api/blogposts?populate=*",
        config
      )
      .then((res) => {
        const responseState = res.data.data[0];
        setState(responseState);

        const buttonsString = responseState?.attributes?.buttons[0]?.children[0]?.text;
        if (buttonsString) {
          try {
            const buttonsArray = JSON.parse(buttonsString);
            setButtons(buttonsArray);
          } catch (error) {
            console.error("Error parsing buttonsItems:", error);
          }
        }

        const imagesItems = state?.attributes?.images
        if(imagesItems){
          try{
      const arrayimagesItems = JSON.parse(responseState?.attributes?.images)
      const imagesitem = arrayimagesItems[activeItems]
      
      setimage(imagesitem)
    
          }catch(error){
            console.error("Error parsing imagesItems:", error);
    
          }
        }



      });
  }, [state,activeItems]);




  if (state === undefined) {
    return <h1>Loading.....</h1>;
  }

  return (
    <>
      <div className="whychoose_container">
        <div className="black_section"></div>
        <div className="whychoose_section">
          <div className="container">
            <div className="whychoose_content">
              <h1 className="why_choose_title">{state?.attributes?.headings}</h1>
              <h2>{state?.attributes?.title}</h2>
              <p>{state?.attributes?.description}</p>
            </div>

            <div className="image_container">
              <div className="first_image">
                <div className="first_image_content">
                  <h1>{title}</h1>
                  <p>{state?.attributes?.description}</p>
                </div>
              </div>

<div className="second_image">
<Image
                    className="image"
                    width={"450"}
                    height={"450"}
                    src={image}
                    alt="image"
                  />
</div>
             

              <div className="details">
                {buttons.map((button, index) => (
                  <div
                    key={index}
                    className={`details_items ${activeItems === index ? 'active_item' : ''}`}
                    onClick={() => {
                      setActiveItems(index);
                      setTitle(button);
                    }}
                  >
                    <i>
                      <MdArrowBackIos />
                    </i>
                    <h1>{button}</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="black_section"></div>
      </div>
    </>
  );
};

export default WhyChooseUs;
