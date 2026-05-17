import React, { useState, useRef } from "react";
import { 
  Upload, 
  Star, 
  Layers, 
  Tag, 
  PackagePlus, 
  FileSpreadsheet, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Play,
  RotateCcw,
  Loader2
} from "lucide-react";
import useAxiosSecure from "../hooks/useAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Expected schemas for e-commerce operator guides
const SCHEMA_GUIDES = {
  category: [
    { column: "category_id (or id)", desc: "Unique category numeric identifier" },
    { column: "category_name (or name)", desc: "Human readable category label" },
    { column: "image_url", desc: "Public link to category representation image" },
    { column: "is_best_selling", desc: "Set as '1' or 'true' to display in best categories" }
  ],
  subcategory: [
    { column: "subcategory_id (or id)", desc: "Unique subcategory numeric identifier" },
    { column: "subcategory_name (or name)", desc: "Subcategory name" },
    { column: "category_id", desc: "Parent category ID relation" },
    { column: "is_best_selling", desc: "Set as '1' or 'true' to display in best subcategories" }
  ],
  brand: [
    { column: "brand_id (or id)", desc: "Unique brand numeric identifier" },
    { column: "brand_name (or name)", desc: "Premium brand label name" },
    { column: "logo_url", desc: "Link to brand emblem representation" },
    { column: "is_best_selling", desc: "Set as '1' or 'true' to display in best brands" }
  ],
  "new-arrival": [
    { column: "barcode", desc: "Unique product scan barcode (Monospace format)" },
    { column: "item_code", desc: "SAP inventory code reference" },
    { column: "item_name", desc: "Complete product name" },
    { column: "is_new_arrival", desc: "Set as '1' or 'true' to tag as new arrival" }
  ]
};

const ProductUpload = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("category");
  
  // Independent file buffers so switching tabs preserves unsaved draft files!
  const [tabFiles, setTabFiles] = useState({
    category: null,
    subcategory: null,
    brand: null,
    "new-arrival": null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [dryRun, setDryRun] = useState(false); // Dry run query validation
  const [showGuide, setShowGuide] = useState(false); // Collapsible schema guide

  const fileInputRef = useRef(null);

  const tabs = [
    { id: "category", label: "Best Category", icon: <Layers size={16} /> },
    { id: "subcategory", label: "Best Subcategory", icon: <Tag size={16} /> },
    { id: "brand", label: "Best Brand", icon: <Star size={16} /> },
    { id: "new-arrival", label: "New Arrival Products", icon: <PackagePlus size={16} /> },
  ];

  // Dynamic template loader from live backend API, falling back to static templates
  const handleDownloadTemplate = async () => {
    try {
      const response = await axiosSecure.get("/api/v1/products/upload-template/", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Product_Upload_${activeTab}_Template.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.success("Excel template downloaded from server!");
    } catch (error) {
      console.warn("API template not available, downloading local template:", error);
      // Clean fallback
      const link = document.createElement("a");
      link.href = "/templates/Product_Upload_Template.xlsx";
      link.setAttribute("download", "Product_Upload_Template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.info("Downloaded fallback Excel template.");
    }
  };

  // Safe validation check on selected files
  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (fileExtension === 'xlsx' || fileExtension === 'csv') {
      setTabFiles(prev => ({
        ...prev,
        [activeTab]: selectedFile
      }));
      toast.success(`${selectedFile.name} buffered successfully.`);
    } else {
      Swal.fire({
        title: "Invalid File Format!",
        text: "Only Microsoft Excel (.xlsx) and CSV (.csv) files are supported for ingestion. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33"
      });
    }
  };

  const handleFileChange = (e) => {
    validateAndSetFile(e.target.files[0]);
    e.target.value = null; // Clear input element
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  // Main Upload API implementation using Multipart Form-Data
  const handleUploadProcess = async () => {
    const file = tabFiles[activeTab];
    if (!file) {
      toast.error("Please choose a valid Excel/CSV file first.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosSecure.post("/api/v1/products/upload/", formData, {
        params: {
          dry_run: dryRun,
          upload_type: activeTab // Informs proxy backend about sheet intent
        },
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      Swal.fire({
        title: dryRun ? "Validation Successful!" : "Sync Completed!",
        text: response.data?.message || (dryRun 
          ? "All rows are correctly configured. No database modifications were made." 
          : `Successfully synchronized ${file.name} to the active database.`),
        icon: "success",
        confirmButtonColor: "#00CE51"
      });

      // Purge state buffer for this tab on success
      setTabFiles(prev => ({
        ...prev,
        [activeTab]: null
      }));

    } catch (error) {
      console.error("Ingestion failed:", error);
      let errMsg = "Excel sheets mismatch database schemas. Make sure all required columns exist.";
      
      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          errMsg = error.response.data;
        } else if (error.response.data.detail) {
          errMsg = typeof error.response.data.detail === "object" 
            ? JSON.stringify(error.response.data.detail, null, 2) 
            : error.response.data.detail;
        } else if (error.response.data.message) {
          errMsg = error.response.data.message;
        }
      }

      Swal.fire({
        title: "Ingestion Rejected!",
        html: `<div class="text-left bg-[#111] p-3 rounded border border-red-500/20 text-xs font-mono overflow-auto max-h-48 text-gray-300 whitespace-pre-wrap">${errMsg}</div>`,
        icon: "error",
        confirmButtonColor: "#d33"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentFile = tabFiles[activeTab];

  return (
    <div className="space-y-6">
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6">
        
        {/* Upper Dashboard Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Product Ingestion
              {isLoading && <Loader2 size={16} className="animate-spin text-[#00CE51]" />}
            </h1>
            <p className="text-gray-400 text-sm mt-1">Configure featured parameters and synchronize database catalogs via bulk Excel/CSV uploads</p>
          </div>
          
          <button 
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 bg-[#1A1A1A] border border-[#262626] hover:border-[#00CE51] text-gray-300 hover:text-[#00CE51] px-4 py-2.5 rounded-lg text-sm font-semibold transition-all group cursor-pointer"
          >
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Download Excel Template</span>
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap gap-2 border-b border-[#262626] mb-8">
          {tabs.map((tab) => {
            const hasBufferedFile = !!tabFiles[tab.id];
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (isLoading) return;
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-all relative cursor-pointer ${
                  activeTab === tab.id
                    ? "text-[#00CE51]"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {hasBufferedFile && (
                  <span className="w-2 h-2 rounded-full bg-[#00CE51] absolute top-2 right-2 animate-ping" />
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00CE51] rounded-t-full shadow-[0_-2px_10px_rgba(0,206,81,0.5)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Collapsible Format Schema Guide */}
        <div className="mb-6 bg-[#0B0B0B] border border-[#262626] rounded-xl overflow-hidden">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="w-full flex items-center justify-between p-4 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <HelpCircle size={14} className="text-[#00CE51]" />
              <span>GUIDE: EXPAND EXCEL COLUMNS & VALUE SCHEMA</span>
            </span>
            <span>{showGuide ? "COLLAPSE GUIDE" : "SHOW GUIDE"}</span>
          </button>
          
          <div className={`transition-all duration-300 overflow-hidden ${
            showGuide ? "max-h-[300px] border-t border-[#262626] p-4 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <table className="w-full text-xs text-left text-gray-400">
              <thead>
                <tr className="border-b border-[#262626] text-gray-500 uppercase tracking-wider font-bold">
                  <th className="pb-2 w-1/3">Column Header</th>
                  <th className="pb-2">Description & Formatting Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {SCHEMA_GUIDES[activeTab].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-2.5 font-mono text-white text-[11px] font-semibold">{row.column}</td>
                    <td className="py-2.5 text-gray-400 text-[11px]">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informative Disclaimer Alert */}
        <div className="bg-[#1A1A1A] rounded-lg p-5 border border-[#262626] mb-8">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 bg-[#00CE51]/10 text-[#00CE51] rounded-lg flex-shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Standardized Database Ingestion Mode</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Ensure that column headers match the dynamic schema guides. Unmatched file structures will be rejected by the remote validator to preserve SAP integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Drag & Drop File Upload Ingestion Box */}
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`bg-[#0B0B0B] border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              currentFile 
                ? 'border-[#00CE51] bg-[#00CE51]/5' 
                : 'border-[#262626] hover:border-[#00CE51]/40'
            }`}
          >
            <div className="flex flex-col items-center">
              
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-inner transition-colors ${
                currentFile ? 'bg-[#00CE51]/20 text-[#00CE51]' : 'bg-[#1A1A1A] text-gray-500'
              }`}>
                <FileSpreadsheet size={30} />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">
                {currentFile ? "File Buffered Successfully" : `Upload ${tabs.find(t => t.id === activeTab)?.label}`}
              </h3>
              <p className="text-gray-500 text-xs mb-6 max-w-sm">
                Drag and drop your spreadsheet here, or click select to browse local files. Support formats: **.xlsx, .csv**
              </p>

              {!currentFile ? (
                <div>
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    disabled={isLoading}
                    className="bg-[#00CE51] hover:bg-[#00b045] text-[#0B0B0B] px-8 py-2.5 rounded-lg font-bold transition-all flex items-center gap-2 mx-auto cursor-pointer disabled:opacity-50"
                  >
                    <Upload size={16} />
                    Select Spreadsheet
                  </button>
                </div>
              ) : (
                <div className="w-full max-w-md space-y-4">
                  <div className="flex items-center justify-between gap-3 text-[#00CE51] bg-[#00CE51]/10 px-4 py-2.5 rounded-lg border border-[#00CE51]/20">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <CheckCircle2 size={16} className="flex-shrink-0" />
                      <span className="text-xs font-bold truncate">{currentFile.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono flex-shrink-0">
                        ({(currentFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button 
                      onClick={() => setTabFiles(prev => ({ ...prev, [activeTab]: null }))}
                      disabled={isLoading}
                      className="text-gray-400 hover:text-white p-0.5 rounded hover:bg-white/5 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Dry Run Toggle Widget */}
                  <div className="flex items-center justify-between bg-[#141414] border border-[#262626] rounded-lg p-3">
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-white">Validation Dry Run Mode</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">Parse columns and data for errors without mutating rows</p>
                    </div>
                    <button
                      onClick={() => setDryRun(!dryRun)}
                      disabled={isLoading}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer ${
                        dryRun ? "bg-[#00CE51]" : "bg-[#262626]"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-[#0B0B0B] transition-transform duration-200 ${
                        dryRun ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* Action Process Button */}
                  <button 
                    onClick={handleUploadProcess}
                    disabled={isLoading}
                    className="w-full bg-[#00CE51] text-[#0B0B0B] py-3 rounded-lg font-bold shadow-[0_4px_15px_rgba(0,206,81,0.2)] hover:shadow-[0_4px_25px_rgba(0,206,81,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Processing File Ingestion...</span>
                      </>
                    ) : (
                      <>
                        {dryRun ? <Play size={16} className="fill-[#0B0B0B]" /> : <RotateCcw size={16} />}
                        <span>{dryRun ? "Execute Dry Run Check" : "Commit Ingestion & Process"}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".xlsx, .csv"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default ProductUpload;
