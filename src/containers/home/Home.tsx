import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAmgStartApi from "@/hooks/useAmgStartApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const Home = () => {
  const { userDetails, getUserDetails } = useAmgStartApi();
  const { userEmail } = useParams();

  console.log("HOME");
  console.log(userDetails?.startList?.cards);
  useEffect(() => {
    if (userEmail) getUserDetails(userEmail);
  }, []);
  return (
    <div className="p-2">
      <div>Welcome, {userDetails?.startList.users[0].nickName}</div>
      <div className="p-10 flex justify-center flex-wrap gap-5">
        {userDetails?.startList?.cards?.map((item) => {
          return (
            <>
              <Card className="sm:max-w-[250px] sm:max-h-[350px]">
                <CardHeader className="bg-red-600">
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.description}
                </CardContent>
              </Card>
            </>
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
