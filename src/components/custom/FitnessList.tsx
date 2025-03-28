import { useContext, useState } from "react";
import { FitnessContext } from "@/contexts/FitnessContext";
import FitnessItem from "./FitnessItem";
import { Button } from "../ui/button";
import FitnessForm from "./FitnessForm";

const FitnessList = () => {
  const { exercises, resetProgress } = useContext(FitnessContext);
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <center>
        <h1 className="text-center text-4xl font-bold mb-4">Список тренировок</h1>
        <Button onClick={() => setModal(true)} className="bg-green-500 hover:bg-green-600">
          Добавить упражнение
        </Button>
        <Button onClick={resetProgress} className="ml-4 bg-red-500 hover:bg-red-600">
          Сбросить всё
        </Button>
      </center>
      <center className="grid grid-cols-3 gap-4 p-20">
        {exercises.map((exercise) => (
          <FitnessItem key={exercise.id} {...exercise} />
        ))}
        {modal && <FitnessForm setModal={setModal} />}
      </center>
    </>
  );
};

export default FitnessList;
