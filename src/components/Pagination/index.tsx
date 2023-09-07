import './index.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = (): number[] => {
    return Array.from(Array(totalPages).keys());
  };

  return (
    <div className="pagination-container">
      <nav aria-label="Pagination">
        <ul className="pagination">
          {getPageNumbers().map((page) => (
            <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(page + 1)}
                type="button"
                data-testid={`page-button-${page + 1}`}
              >
                {page + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
