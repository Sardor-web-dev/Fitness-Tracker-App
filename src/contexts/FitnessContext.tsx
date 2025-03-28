import { useApi } from "@/hooks/UseApi";
import { method } from "@/types/methodsApi";
import { createContext, useEffect, useState, ReactNode } from "react";

interface Exercise {
  id: number;
  name: string;
  description: string;
  duration: number;
}

const API_URL = "/fitness";

interface FitnessContextType {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, "id">) => void;
  deleteExercise: (id: number) => void;
  resetProgress: () => void;
  loading: boolean;
  error: boolean;
}

export const FitnessContext = createContext<FitnessContextType | null>(null);

export const FitnessProvider = ({ children }: { children: ReactNode }) => {
  const { fetchData, loading, error } = useApi(import.meta.env.VITE_PUBLIC_API); 
  
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    fetchData("/fitness", method.get).then((res) => {
      setExercises(res?.data); 
    });
  }, []);
  
  const addExercise = async (exercise: Omit<Exercise, "id">) => {
    const newExercise = { id: Date.now(), ...exercise }; 
    const res = await fetchData(API_URL, method.post, newExercise);
    if (res?.data) {
      setExercises((prev) => [...prev, res.data]);
    }
  };
  
const deleteExercise = async (id: number) => {
  const success = await fetchData(`${API_URL}/${id}`, method.delete);
  if (success) {
    setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
  }
};

  const resetProgress = async () => {
    await Promise.all(exercises.map((exercise) => fetchData(`${API_URL}/${exercise.id}`, method.delete)));
    setExercises([]);
  };

  return (
    <FitnessContext.Provider value={{ exercises, addExercise, deleteExercise, resetProgress, loading, error }}>
      {children}
    </FitnessContext.Provider>
  );
};
