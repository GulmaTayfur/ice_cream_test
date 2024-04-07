import Card from "./components/Card/index";
import Form from "./components/Form/index";
import Scoops from "./components/Scoops/index";
import Toppings from "./components/Toppings/index";

const App = () => {
  return (
    <div>
      <Scoops />
      <Toppings />
      <Form />
    </div>
  );
};

export default App;
