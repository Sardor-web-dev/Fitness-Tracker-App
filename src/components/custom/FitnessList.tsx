import { useApi } from "@/hooks/UseApi";
import { method } from "@/types/methodsApi";
import { useEffect, useState } from "react";
import FitnessItem from "./FitnessItem";

export interface item{
  id: number;
  name: string;
  description: string;
  duration: string
  onDelete: (id: number) => void;
}

const FitnessList = () => {
  const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_API);
  const [fitness, setFitness] = useState<item[]>([]);
  
  useEffect(() => {
    fetchData("/fitness", method.get)
     .then((res) => setFitness(res?.data))  
  }, []);

  const handleDeleteItem = (id: number) => {
    setFitness((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
    <h1 className="text-center text-4xl font-bold">Fitness List</h1>
    <center className="grid grid-cols-3 gap-4 p-20">
        {fitness.map((item: item) => (
          <FitnessItem key={item.id} {...item} onDelete={handleDeleteItem}/>
        ))}
    </center>
    </>
  );
}
 
export default FitnessList;