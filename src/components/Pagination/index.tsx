import ReactPaginate from "react-paginate";
import s from "./Pagination.module.scss";

type PaginationProps = {
  onPageChange: (i: number) => void;
  currentPage: number;
}
const Pagination: React.FC<PaginationProps> = ({ onPageChange, currentPage }) => {
  return (
    <div>
      <ReactPaginate
        className={s.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onPageChange(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
