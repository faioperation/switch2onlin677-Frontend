const LeadsPagination = ({ page, setPage, totalPages, total, limit }) => {

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

      <p className="text-sm text-gray-400">
        Showing {start} to {end} of {total} entries
      </p>

      <div className="flex gap-2">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border border-[#2A2A2A] rounded text-gray-300"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (

          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-[#00CE51] text-white"
                : "bg-[#111] text-gray-300"
            }`}
          >
            {i + 1}
          </button>

        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-[#00CE51] text-white rounded"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default LeadsPagination;