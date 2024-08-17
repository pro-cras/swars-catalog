import { Category } from "../../api/api";
import { Button } from "../button/Button";

export function ResourceTable({ category }: { category: Category }) {
  return (
    <>
      <div className="flex">
        <Button>Create</Button>
      </div>
    </>
  );
}
