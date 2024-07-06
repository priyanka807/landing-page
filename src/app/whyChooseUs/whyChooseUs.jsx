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
// const images =  ["/laptop.jpg" ,  "/gatwick_bg.jpg" ,  "/london_city_bg.jpg" ,"/about_banner.jpg","/laptop.jpg"]  


  const [buttons, setButtons] = useState(null);

  useEffect(() => {
    let token =
      "0dccc54733b7f741dc4f9a41e8e43d355e357dbe74fe72375201d298190e434b17b72e06fb30c48916ae38199d7c5acc9f3a06557d5331d84393d9e4c609876dc8dd35f7682148c237e13a16f0bf9a7825a48fcd04543eb76dbd8d64166f7b1994e3d708466b40416f3ff7948b3b7e29e82ea1bc09fa2b592d95e5a5aacebeda";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };


    axios
      .get(
        "https://my-strapi-project-8vpv.onrender.com/api/blogposts?populate=*",
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
                  {/* <Image
                    className="image"
                    width={"450"}
                    height={"450"}
                    src={images[activeItems]}
                    alt="image"
                  /> */}
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
