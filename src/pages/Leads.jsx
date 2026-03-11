import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LeadsHeader from "../components/leads/LeadsHeader";
import LeadsTable from "../components/leads/LeadsTable";
import LeadsPagination from "../components/leads/LeadsPagination";

const fetchLeads = async () => {
  const res = await fetch("/leads.json");
  return res.json();
};

const Leads = () => {

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: fetchLeads,
  });

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 10;

  /* ===========================
     🔍 Search + Platform Filter
  =========================== */

  const filtered = leads.filter((lead) => {

    const searchMatch = lead.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const platformMatch =
      platform === "all" ||
      lead.platform.toLowerCase() === platform;

    return searchMatch && platformMatch;

  });

  /* ===========================
     📄 Pagination Logic
  =========================== */

  const totalPages = Math.ceil(filtered.length / limit);

  const start = (page - 1) * limit;

  const paginatedData = filtered.slice(start, start + limit);

  /* ===========================
     📥 CSV Export Function
  =========================== */

  const exportCSV = () => {

    if (!filtered.length) return;

    // CSV Header
    const headers = ["Name", "Product", "Date", "Platform"];

    // CSV Rows
    const rows = filtered.map((lead) => [
      lead.name,
      lead.product,
      lead.date,
      lead.platform
    ]);

    // Convert to CSV format
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads-${Date.now()}.csv`);

    document.body.appendChild(link);
    link.click();
  };

  return (

    <div className="space-y-6">

      <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6">

        {/* Header */}
        <LeadsHeader
          search={search}
          setSearch={setSearch}
          platform={platform}
          setPlatform={setPlatform}
          onExport={exportCSV}
        />

        {/* Table */}
        <LeadsTable data={paginatedData} />

        {/* Pagination */}
        <LeadsPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          total={filtered.length}
          limit={limit}
        />

      </div>

    </div>

  );
};

export default Leads;