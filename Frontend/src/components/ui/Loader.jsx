import { Skeleton } from "@/components/ui/skeleton";

export function Loader({ amount }) {
  const skeletons = [];
  for (let index = 0; index < amount; index++) {
    skeletons.push(index);
  }
  return (
    <div className=" flex justify-center gap-2 flex-wrap">
      {skeletons.map((item) => (
        <Skeleton key={item} className="h-[250px] w-[320px] rounded-xl" />
      ))}
    </div>
  );
}
