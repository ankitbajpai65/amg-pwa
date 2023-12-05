import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const [btnAccess, setBtnAccess] = useState(false);
  const navigate = useNavigate();
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setBtnAccess(true);
    } else {
      setBtnAccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-3/4 overflow-hidden">
      <div
        className="my-5 mx-10 p-10 text-xl h-3/4 border overflow-auto"
        onScroll={(e) => handleScroll(e)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi totam, et,
        excepturi repellendus reiciendis voluptates dolores eum maxime vel in,
        dolor omnis a quidem beatae vitae assumenda consequuntur minus facilis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque
        commodi ex quas? Animi, dolor repudiandae ex a quos veniam, autem
        perferendis possimus esse dolorum eligendi asperiores accusantium
        voluptate odit?Lorem ipsum dolor sit amet consectetur adipisicing elit.
        In eligendi nesciunt voluptatum! Laboriosam veniam quisquam quos
        consequatur officiis, quia iste porro reiciendis ea dolore nesciunt
        sapiente necessitatibus sit aliquid odio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi labore maiores aliquam unde autem.
        Libero adipisci sit blanditiis ipsa fuga commodi, quos optio aut sed
        dolorem, fugiat nulla architecto sapiente! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi totam, et, excepturi repellendus
        reiciendis voluptates dolores eum maxime vel in, dolor omnis a quidem
        beatae vitae assumenda consequuntur minus facilis? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Unde neque commodi ex quas? Animi,
        dolor repudiandae ex a quos veniam, autem perferendis possimus esse
        dolorum eligendi asperiores accusantium voluptate odit?Lorem ipsum dolor
        sit amet consectetur adipisicing elit. In eligendi nesciunt voluptatum!
        Laboriosam veniam quisquam quos consequatur officiis, quia iste porro
        autem perferendis possimus esse dolorum eligendi asperiores accusantium
        maiores aliquam unde autem. Libero adipisci sit blanditiis ipsa fuga
        commodi, quos optio aut sed dolorem, fugiat nulla architecto
        sapiente!Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
        totam, et, excepturi repellendus reiciendis voluptates dolores eum
        maxime vel in, dolor omnis a quidem beatae vitae assumenda consequuntur
        minus facilis? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Unde neque commodi ex quas? Animi, dolor repudiandae ex a quos veniam,
        autem perferendis possimus esse dolorum eligendi asperiores accusantium
        voluptate odit?Lorem ipsum dolor sit amet consectetur adipisicing elit.
        In eligendi nesciunt voluptatum! Laboriosam veniam quisquam quos
        consequatur officiis, quia iste porro reiciendis ea dolore nesciunt
        sapiente necessitatibus sit aliquid odio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Modi labore maiores aliquam unde autem.
        Libero adipisci sit blanditiis ipsa fuga commodi, quos optio aut sed
        dolorem, fugiat nulla architecto sapiente!
      </div>

      <button
        className="rounded-2xl bg-red-600 p-2 m-2 border text-white font-medium
      mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500
      active:bg-red-700 text-2xl px-5 disabled:pointer-events-none disabled:bg-slate-300"
        disabled={!btnAccess}
        onClick={() => navigate("/privacy/step2")}
      >
        AGREE
      </button>
    </div>
  );
};
export default PrivacyPolicy;
