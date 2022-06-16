import React from "react";
import { usePagination, DOTS } from './usePagination.tsx';

const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 2,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage + 1 > totalCount) return;
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage - 1 < 1) return;
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`pagination ${className}`}>
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} onClick={onPrevious} >
        <button className="page-link">{'<'}</button>
      </li>
      {paginationRange.map((pageNumber: number) => {
        if (pageNumber === DOTS) {
          return (
            <li className="page-item dots">&#8230;
            </li>
          );
        }
        return (
          <li className={`page-item ${pageNumber === currentPage ? 'selected' : ''}`} onClick={() => onPageChange(pageNumber)}>
            <button className="page-link">{pageNumber}</button>
          </li>
        );
      })}
      <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`} onClick={onNext}>
        <button className="page-link">{'>'}</button>
      </li>
    </ul>
  );
};

export default Pagination;