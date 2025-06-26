import { getComplaints, type TComplaint } from "@/services/complaints";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";



// complaints
export const usegetCompaints = (): UseQueryResult<TComplaint,Error> =>{
    return useQuery({
        queryKey: ['complaints'],
        queryFn: getComplaints
    })
}