import { useBearStore } from "@/store/index";

const Son = () => {
  const { bears } = useBearStore();

  return (
    <div>
      <span>this is children component {bears}</span>
    </div>
  );
};

export default Son;
