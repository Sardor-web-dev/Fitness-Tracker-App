import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { item } from "./FitnessList";
import { useApi } from "@/hooks/UseApi";
import { method } from "@/types/methodsApi";


const FitnessItem = ({id, name, description, duration, onDelete}: item,) => {
    const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_API);

    async function handleDelete() {
        const url = `/fitness/${id}`;
        console.log("Удаляем по URL:", url);
      
        try {
          await fetchData(url, method.delete);
          onDelete(id);
        } catch (error) {
          console.error("Ошибка при удалении:", error);
        }
      }
  return (
    <>
      <Card className="flex w-[400px] h-[200px] flex-col gap-2" key={id}>
        <CardTitle>{name}</CardTitle>
        <CardHeader>{description}</CardHeader>
        <CardContent>{duration}</CardContent>
        <Button onClick={handleDelete} className="cursor-pointer">Delete task</Button>
      </Card>
    </>
  );
};

export default FitnessItem;
