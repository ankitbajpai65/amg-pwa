import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAmgStartApi from "@/hooks/useAmgStartApi";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Home = () => {
  const { userDetails } = useUserDetails();

  const { getUserDetails } = useAmgStartApi();
  const { userEmail } = useParams();

  useEffect(() => {
    if (!userDetails) getUserDetails(userEmail as string);
  }, [userDetails]);


  return (
    <div className="p-2 h-max pb-14">
      <div className="text-lg font-semibold">Welcome, {userDetails?.startList.users[0].nickName}</div>
      <div className="p-2 flex justify-center flex-wrap gap-5 mobile:max-sm:gap-1 mobile:max-sm:p-1">
        {userDetails?.startList?.cards?.map((item, key) => {
          return (
            <Card
              className=" rounded-xl sm:max-w-[250px] sm:max-h-[350px] mobile:max-sm:w-2/5 mobile:max-sm:h-60"
              key={key}
            >
              <CardHeader className="bg-red-600">
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>{item.description}</CardContent>
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
