import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import "./styles.css";

//create a new instance of QueryClient
const client = new QueryClient();
const getData = async () => {
  const res = await axios("https://api.github.com/users/DarshanchGIT");
  // console.log(res.data.name);
  return res.data.name;
};

//pass the client into provider
export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Github />
    </QueryClientProvider>
  );
};
export const Github = () => {
  const { status, data } = useQuery({
    queryKey: ["githubusername"],
    queryFn: getData,
  });
  // console.log(status);
  if (status === "pending") return <div className="App">...Loading </div>;
  if (status === "error")
    return <div className="App">...Failed to Load !! </div>;
  return (
    <div className="App">
      <h1>Github Username:{data}</h1>
    </div>
  );
};
