import FitnessList from "./components/custom/FitnessList";
import { FitnessProvider } from "./contexts/FitnessContext";

function App() {
  return (
    <FitnessProvider>
      <FitnessList />
    </FitnessProvider>
  );
}

export default App;
