export function formatPagination(totalPages: number, page: number){
  const startPage = Math.max(1, page - 4);
  const endPage = Math.min(totalPages, page + 5);

  let formatted = Array.from({ length: endPage - startPage + 1 }).map(
    (_, index) => startPage + index
  );

  if (formatted[formatted.length - 1] !== totalPages) {
    formatted.push(totalPages);
  }

  return formatted;
}
