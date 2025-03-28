import { useContext } from "react";
import { FitnessContext } from "@/contexts/FitnessContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface FitnessItemProps {
  id: number;
  name: string;
  description: string;
  duration: number;
}

const FitnessItem = ({ id, name, description, duration }: FitnessItemProps) => {
  const { deleteExercise } = useContext(FitnessContext);

  return (
    <Card className="flex w-[350px] p-4 flex-col gap-2 shadow-lg">
      <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      <CardHeader className="text-sm text-gray-500">{description}</CardHeader>
      <CardContent className="text-md">Время: {duration} мин</CardContent>
      <Button
        onClick={() => deleteExercise(id)}
        className="bg-red-500 hover:bg-red-600 mt-2"
      >
        Удалить
      </Button>
    </Card>
  );
};

export default FitnessItem;
