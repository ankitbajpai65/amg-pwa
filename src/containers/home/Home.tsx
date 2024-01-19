import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userDetails } = useUserDetails();
  const navigate = useNavigate();

  const handleCardClick = (card: { code: string; html: string }) => {
    if (card.code === "AMGDEMO_GENAI") {
      navigate("/pwa/gen-ai/gpt-prompt");
    } else {
      window.open(card.html, "_blank", "noreferrer");
    }
  };

  return (
    <div className="p-2 h-max pb-14">
      <div className="text-lg font-semibold">
        Welcome, {userDetails?.startList.users[0].nickName}
      </div>
      <div className="p-2 flex justify-center flex-wrap gap-5 mobile:max-sm:gap-1 mobile:max-sm:p-1">
        {userDetails?.startList?.cards?.map((item, key) => {
          return (
            <Card
              className=" rounded-xl bg-bg-card-light-gray m-2 shadow-lg w-full"
              key={key}
            >
              <CardHeader>
                <div className="text-sm font-semibold text-text-light-gray">{item.code}</div>
                <CardTitle className="text-text-blue">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">{item.description}</CardContent>
              <CardFooter>
                <button
                  className="bg-text-red p-3 px-8 rounded-md sm:text-xl text-white"
                  onClick={() => handleCardClick(item)}
                >
                  Start
                </button>
              </CardFooter>
            </Card>
          );
        })}
        {/* <Card className="w-[250px] h-[350px]  ">
          <CardHeader className="bg-red-600 ">
            <CardTitle>GEN-AI</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum nulla
            perspiciatis veniam mollitia cupiditate libero debitis error, itaque
            ipsum impedit deserunt, distinctio vel ratione saepe natus nesciunt
            labore, corrupti facilis?
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};
export default Home;
