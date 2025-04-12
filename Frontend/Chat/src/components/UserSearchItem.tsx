
export interface UserSearchItemProps {
  imageUrl: string;
  username: string;
  onSendRequest: () => void;
}

export default function UserSearchItem({ imageUrl, username, onSendRequest }: UserSearchItemProps) {
  return (
    <div className="flex items-center p-4 border-b border-gray-600">
      <img
        src={imageUrl}
        alt={username}
        className="object-cover w-12 h-12 mr-4 rounded-full"
      />
      <div className="flex-1">
        <h3 className="font-bold text-white">{username}</h3>
      </div>
      <button
        onClick={onSendRequest}
        className="px-3 py-1 bg-[#fe7541] hover:bg-[#e86436] text-white rounded text-sm font-bold"
      >
        Enviar solicitud
      </button>
    </div>
  );
}
