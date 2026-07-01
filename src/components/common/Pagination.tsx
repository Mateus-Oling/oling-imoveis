import Link from "next/link"

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="mt-8 flex justify-center gap-2">
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`rounded-md px-6 py-4 ${
            page === currentPage
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </Link>
      ))}
    </nav>
  )
}
