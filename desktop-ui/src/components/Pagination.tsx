// components/Pagination.tsx
"use client";

import Button from "@/components/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="disabled:opacity-50"
      >
        Previous
      </Button>
      <span className="text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
}