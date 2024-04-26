import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../api/api"
import { toast } from "react-toastify"

export const useUpdateProfile = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: profile.updateProfile,
		onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
			toast.success('Данные обновлены')
    },
	})
}