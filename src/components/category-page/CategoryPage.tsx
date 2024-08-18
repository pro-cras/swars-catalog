import { useLocation } from "react-router-dom";
import { Header } from "../header/Header";
import { PageContent } from "../page-content/PageContent";
import { Category } from "../../api/api";
import { titleCase } from "../../utils/title-case";
import { ResourceTable } from "../resource-table/ResourceTable";
import { useSearchTermParam } from "../../utils/use-search-term-param";

export function CategoryPage() {
  const location = useLocation();
  const searchTerm = useSearchTermParam();
  const category = location.pathname.split("/")[1] as Category;
  return (
    <>
      <Header />
      <PageContent className="flex-col">
        <h1>{`${titleCase(category)} results for '${searchTerm ?? ""}'`}</h1>
        {category === "people" ? <ResourceTable /> : null}
      </PageContent>
    </>
  );
}
