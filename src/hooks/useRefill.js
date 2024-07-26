import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../api/api"
import { toast } from "react-toastify"

export const useRefill = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: profile.refillBalance,
		onSuccess: () => {
      queryClient.invalidateQueries(['balance-operations'])
			toast.success('Заявка создана')
    }, 
	})
}