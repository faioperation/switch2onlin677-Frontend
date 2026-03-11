import { Search, SlidersHorizontal, Download } from "lucide-react";

const LeadsHeader = ({ search, setSearch, platform, setPlatform, onExport }) => {

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 mb-6">

      <h2 className="text-white text-lg font-semibold">
        Leads
      </h2>

      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-[#111] border border-[#2A2A2A] rounded-lg pl-9 pr-3 py-2 text-sm text-white"
          />
        </div>

        {/* Filter */}
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="bg-[#111] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-white"
        >
          <option value="all">All</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="whatsapp">WhatsApp</option>
        </select>

        {/* Export */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-[#00CE51] text-black px-3 py-2 rounded-lg text-sm font-medium"
        >
          <Download size={16} />
          Export CSV
        </button>

      </div>

    </div>
  );
};

export default LeadsHeader;