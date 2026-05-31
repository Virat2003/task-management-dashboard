interface StatCardProps {
  title: string;
  value: number;
}


function getIcon(title: string) {
  if (title === "Total Tasks") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    );
  }
  if (title === "Completed Tasks") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (title === "Pending Tasks") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (title === "Team Members") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  // Fallback icon
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}


function getAccent(title: string) {
  if (title === "Total Tasks")
    return { icon: "bg-blue-100 text-blue-600", value: "text-blue-700" };
  if (title === "Completed Tasks")
    return { icon: "bg-green-100 text-green-600", value: "text-green-700" };
  if (title === "Pending Tasks")
    return { icon: "bg-yellow-100 text-yellow-600", value: "text-yellow-700" };
  if (title === "Team Members")
    return { icon: "bg-indigo-100 text-indigo-600", value: "text-purple-700" };
  return { icon: "bg-slate-100 text-slate-600", value: "text-slate-700" };
}

export default function StatCard({ title, value }: StatCardProps) {
  const accent = getAccent(title);

  return (

    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">
          {title}
        </h3>

        <div className={`p-3 rounded-xl ${accent.icon}`}>
          {getIcon(title)}
        </div>
      </div>


      <p className={`text-4xl font-extrabold ${accent.value}`}>
        {value}
      </p>


      <p className="text-xs text-slate-400 mt-2">
        Total count
      </p>
    </div>
  );
}