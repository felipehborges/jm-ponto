import { Skeleton } from '@/components/ui/skeleton'

export default function EmployeeDetailsLoading() {
  return (
    <div className="px-6 pt-4">
      <div className="flex max-w-1/2 mb-4 flex-col gap-2">
        <Skeleton className="h-10 rounded" />
        <Skeleton className="h-10 rounded" />
        <Skeleton className="h-10 rounded" />
      </div>

      <div className="flex-wrap w-full gap-4 flex">
        <Skeleton className="size-40 rounded" />
        <Skeleton className="size-40 rounded" />
        <Skeleton className="size-40 rounded" />
      </div>
    </div>
  )
}
