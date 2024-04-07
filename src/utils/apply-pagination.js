export function applyPagination(documents, page, rowsPerPage) {

  if(documents === undefined)
    return;

  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}