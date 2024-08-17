import { Category } from "../../api/api";
import { Button } from "../button/Button";

export function ResourceTable(_props: { category: Category }) {
  return (
    <>
      <div className="flex">
        <Button>Create</Button>
      </div>
    </>
  );
}
