const ChatHeader = ({ user }) => {

  return (
    <div className="flex items-center gap-3 p-4 border-b border-[#262626]">

      <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-white">
        {user.initial}
      </div>

      <div>
        <p className="text-white text-sm font-medium">
          {user.name}
        </p>

        <p className="text-xs text-green-400">
          Active
        </p>
      </div>

    </div>
  );
};

export default ChatHeader;