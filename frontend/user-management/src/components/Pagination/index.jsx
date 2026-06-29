import "./index.css"

const Pagination = ({currentPage, totalPages, setCurrentPage}) => {
    return(
        <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Pervious
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button 
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}

export default Pagination