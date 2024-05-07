import { useMemo } from "react";

export const DOTS = '...';

function range(start, end, step = 1) {
 const result = [];
 for (let i = start; i <= end; i += step) {
    result.push(i);
 }
 return result;
}

export const usePagination = ({
 totalCount,
 pageSize,
 siblingCount = 1,
 currentPage
}) => {
 const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Calculate the total number of page numbers to show
    const totalPageNumbers = siblingCount + 5;

    // If the total number of page numbers is greater than or equal to the total page count,
    // show all page numbers
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Calculate the range for the left and right siblings
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    // Determine if we should show the left and right dots
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    // Calculate the range for the first and last page numbers
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // If we should show the left dots but not the right dots, show the first few page numbers,
    // the left dots, and the last page number
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPageIndex];
    }

    // If we should show the right dots but not the left dots, show the first page number,
    // the right dots, and the last few page numbers
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // If we should show both the left and right dots, show the first page number,
    // the left dots, the middle range, the right dots, and the last page number
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
 }, [totalCount, pageSize, siblingCount, currentPage]);

 return paginationRange;
};