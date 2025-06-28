import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { durations } from '../api/api';

export const useAllDurations = () => {
	return useQuery({
		queryKey: ['durations'],
		queryFn: durations.getAll,
		select: d => d.data
	})
}

export const useDuration = (id) => {
	return useQuery({
		queryKey: ['durations', id],
		queryFn: () => durations.getById(id),
		select: d => d.data,
		enabled: !!id
	})
}

export const useCreateDuration = () => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: durations.create,
		onSuccess: () => queryClient.invalidateQueries(['durations'])
	})
}

export const useUpdateDuration = () => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: durations.update,
		onSuccess: (data) => queryClient.invalidateQueries(['durations', data.id])
	})
}