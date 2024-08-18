import { useSearchParams } from "react-router-dom";

export function useSearchTermParam() {
  const [searchParams] = useSearchParams();
  return searchParams.get("search") ?? null;
}
