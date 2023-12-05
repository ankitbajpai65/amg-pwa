import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy3 = () => {
  const [btnAccess, setBtnAccess] = useState(false);
  const navigate = useNavigate();

  const handleSwitch = () => {
    setBtnAccess((prev) => !prev);
  };
  console.log(btnAccess);
  return (
    <div className="flex flex-col items-center h-3/4 overflow-hidden">
      <h1>YOYO</h1>
      <div className="my-5 mx-10 p-10 text-xl  border overflow-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi totam, et,
        excepturi repellendus reiciendis voluptates dolores eum maxime vel in,
        dolor omnis a quidem beatae vitae assumenda consequuntur minus facilis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque
        commodi ex quas? Animi, dolor repudiandae ex a quos veniam, autem
        perferendis possimus esse dolorum eligendi asperiores accusantium
      </div>
      <div>
        <label htmlFor="theme-switch">Accept</label>
        <Switch
          id="theme-switch"
          // checked={}
          onClick={() => handleSwitch()}
        />
      </div>

      <button
        className="rounded-2xl bg-red-600 p-2 m-2 border text-white font-medium
      mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500
      active:bg-red-700 text-2xl px-5 disabled:pointer-events-none disabled:bg-slate-300"
        disabled={!btnAccess}
        onClick={() => navigate(`/home/${sessionStorage.getItem('email')}`)}
      >
        AGREE
      </button>
    </div>
  );
};
export default PrivacyPolicy3;
