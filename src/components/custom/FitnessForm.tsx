import { useRef, useEffect, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FitnessContext } from "@/contexts/FitnessContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FitnessFormProps {
  setModal: (value: boolean) => void;
}0

// Тип для формы
interface ExerciseFormData {
  name: string;
  description: string;
  duration: number;
}

const FitnessForm: React.FC<FitnessFormProps> = ({ setModal }) => {
  const { register, handleSubmit, reset } = useForm<ExerciseFormData>();
  const fitnessContext = useContext(FitnessContext);

  if (!fitnessContext) {
    throw new Error("FitnessForm must be used within a FitnessProvider");
  }

  const { addExercise } = fitnessContext;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<ExerciseFormData> = (data) => {
    const newExercise = {
      id: `ex_${Date.now()}`,
      name: data.name,
      description: data.description,
      duration: Number(data.duration),
    };
    addExercise(newExercise);
    reset();
    inputRef.current?.focus();
    setModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[400px] p-6 rounded-lg shadow-xl flex flex-col gap-4"
      >
        <Label className="text-lg font-semibold">Добавить упражнение</Label>
        <Input
          ref={inputRef}
          {...register("name", { required: true })}
          type="text"
          placeholder="Название упражнения"
          className="p-3 rounded-md border border-gray-300 w-full"
        />
        <Input
          {...register("description", { required: true })}
          type="text"
          placeholder="Описание"
          className="p-3 rounded-md border border-gray-300 w-full"
        />
        <Input
          {...register("duration", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Длительность (минуты)"
          className="p-3 rounded-md border border-gray-300 w-full"
        />
        <div className="flex justify-between mt-2">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Добавить
          </Button>
          <Button
            onClick={() => setModal(false)}
            type="button"
            className="bg-gray-500 hover:bg-gray-600"
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FitnessForm;
