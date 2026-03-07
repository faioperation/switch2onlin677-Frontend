import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchAdmins = async () => {
  const res = await fetch("/admins.json");
  return res.json();
};

const saveAdmin = async (data) => {

  const res = await fetch("/api/admin", {
    method: data.id ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const useAdmins = () => {

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdmins,
  });

  const mutation = useMutation({
    mutationFn: saveAdmin,
    onSuccess: () => {
      alert("Admin saved successfully");
      queryClient.invalidateQueries(["admins"]);
    },
  });

  return { ...query, mutation };
};