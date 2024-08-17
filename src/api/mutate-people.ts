import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Resource } from "./api";

function useMutatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: async (newPerson: Resource<"people">) => {
      // update to the new value
      queryClient.setQueryData(
        ["category", "people", newPerson.url],
        newPerson,
      );
    },
  });
}
