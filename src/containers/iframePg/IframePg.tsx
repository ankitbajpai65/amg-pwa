import { useLocation } from "react-router-dom";

const IframePg=()=>{
  const location = useLocation();
  const iframeLink = location.state.iframeLink
return (
  <div className="w-full h-full">
    <iframe src={iframeLink} className="w-full h-full"></iframe>
  </div>
);
}
export default IframePg