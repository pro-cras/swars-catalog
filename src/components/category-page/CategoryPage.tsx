import { useLocation } from "react-router-dom";
import { Header } from "../header/Header";
import { PageContent } from "../page-content/PageContent";
import { Category } from "../../api/api";
import { titleCase } from "../../utils/title-case";

export function CategoryPage() {
  const location = useLocation();
  const category = location.pathname.split("/")[1] as Category;
  return (
    <>
      <Header />
      <PageContent>
        <h1>{titleCase(category)}</h1>
      </PageContent>
    </>
  );
}
