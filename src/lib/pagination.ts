type CreatePaginationProps = {
  page?: string
  pageSize: number
}

export function createPagination({ page, pageSize }: CreatePaginationProps) {
  const currentPage = Math.max(1, Number(page) || 1)

  const from = (currentPage - 1) * pageSize
  const to = from + pageSize - 1

  return {
    currentPage,
    pageSize,
    from,
    to,
  }
}

export function getTotalPages(totalItems: number, pageSize: number) {
  return Math.ceil(totalItems / pageSize)
}
