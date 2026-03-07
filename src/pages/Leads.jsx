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

  const filtered = leads.filter((lead) => {

    const searchMatch = lead.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const platformMatch =
      platform === "all" ||
      lead.platform.toLowerCase() === platform;

    return searchMatch && platformMatch;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const start = (page - 1) * limit;
  const paginatedData = filtered.slice(start, start + limit);

  return (
    <div className="space-y-6">

      <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6">

        <LeadsHeader
          search={search}
          setSearch={setSearch}
          platform={platform}
          setPlatform={setPlatform}
        />

        <LeadsTable data={paginatedData} />

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