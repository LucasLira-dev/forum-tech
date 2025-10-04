import { FaComment, FaPlus } from "react-icons/fa"

interface CommentButtonProps {
    quantity: number;
    onCommentClick: () => void;
}

export const CommentButton = ({ quantity, onCommentClick }: CommentButtonProps) => {
    return (
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2 text-[var(--foreground)]">
          <FaComment className="inline mr-2" />
          <span className="font-bold text-lg hidden md:block">Comentários</span>
          <span className="text-gray-500">({quantity})</span>
        </div>

        <button 
        onClick={onCommentClick}
        className="flex items-center gap-2 bg-[var(--primary)] text-[var(--secondary)] rounded-md px-4 py-2 w-fit hover:brightness-110 transition font-bold cursor-pointer">
          <FaPlus className="mr-2" />
          Comentar
        </button>
      </div>
    );
}