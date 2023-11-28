import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  console.log("hjey");
  return (
    <div className="p-2">
      <div>Welcome, User</div>
      <div className="p-10">
        <Card className="w-[250px] h-[350px]  ">
          <CardHeader className="bg-red-600 ">
            <CardTitle>GEN-AI</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum nulla
            perspiciatis veniam mollitia cupiditate libero debitis error, itaque
            ipsum impedit deserunt, distinctio vel ratione saepe natus nesciunt
            labore, corrupti facilis?
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Home;
