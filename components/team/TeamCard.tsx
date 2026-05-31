import { TeamMember } from "@/types/member";

interface TeamCardProps {
  member: TeamMember;
}


const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-yellow-100 text-yellow-600",
  "bg-rose-100 text-rose-600",
  "bg-orange-100 text-orange-600",
];

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export default function TeamCard({ member }: TeamCardProps) {

  const initial = member.name.charAt(0).toUpperCase();
  const avatarColor = getAvatarColor(member.name);

  return (

    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-5 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-4 mb-4">

        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${avatarColor}`}>
          {initial}
        </div>

        {/* Name + Email stacked vertically */}
        <div className="min-w-0">

          <h2 className="text-base font-semibold text-slate-800 truncate">
            {member.name}
          </h2>
          <p className="text-sm text-slate-500 truncate">
            {member.email}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between">
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {member.role}
          </span>

          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-slate-400">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}