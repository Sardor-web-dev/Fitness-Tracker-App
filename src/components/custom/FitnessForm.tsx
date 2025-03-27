import { useApi } from "@/hooks/UseApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { method } from "@/types/methodsApi";

interface FitnessFormProps {
  setModal: (value: boolean) => void;
}
const FitnessForm = ({ setModal }: FitnessFormProps) => {
  const { register, handleSubmit } = useForm();
  const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_API);

  const onSubmit: SubmitHandler<Record<string, any>> = (name) => {

    fetchData("/fitness", method.post, name).then((res) =>
      console.log(res?.data)
    );
    setModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-red-500 w-[400px] h-[400px] p-6 rounded-lg shadow-lg flex flex-col gap-4"
      >
        <Label className="text-white text-lg">Enter Exercise</Label>
        <Input
          {...register("name", { required: true })}
          type="text"
          placeholder="Enter exercise"
          className="p-3 rounded-md text-black border border-gray-300 w-full"
        />
        <Input
          {...register("description", { required: true })}
          type="text"
          placeholder="Enter exercise"
          className="p-3 rounded-md text-black border border-gray-300 w-full"
        />
        <Input
          {...register("duration", { required: true })}
          type="text"
          placeholder="Enter exercise"
          className="p-3 rounded-md text-black border border-gray-300 w-full"
        />
        <div className="flex justify-between">
          <Button type="submit">Add Exercise</Button>
          <Button onClick={() => setModal(false)} type="button">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FitnessForm;

// {
//     "id": "11",
//     "name": "Zumba",
//     "description": "Aerobic exercise that uses dance moves to burn calories and build strength.",
//     "duration": 60,
//     "caloriesBurned": 150
//   }
