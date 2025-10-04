import { FiX, FiSend } from "react-icons/fi";
import { useState } from "react";

interface NewCommentInputProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (comment: string) => void;
}

export const NewCommentInput = ({ isOpen, onClose, onSubmit }: NewCommentInputProps) => {
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (comment.trim() && onSubmit) {
            onSubmit(comment);
            setComment("");
            onClose();
        }
    };

    const handleCancel = () => {
        setComment("");
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="flex flex-col gap-2 p-4 border border-[var(--border)] rounded-md bg-[#040308]">
                    <div className="p-4 h-40">
                        <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full h-full bg-[var(--input)] rounded-md p-3 resize-none border-none outline-none text-[var(--foreground)]"
                        placeholder="Compartilhe sua opinião sobre o assunto...."
                         />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                        onClick={handleCancel}
                        className="flex gap-2 items-center bg-transparent border border-[var(--border)] text-[var(--muted-foreground)] rounded-md px-4 py-2 w-fit hover:bg-[var(--connectSection)] hover:text-[var(--foreground)] transition whitespace-nowrap cursor-pointer">
                            <FiX />
                            Cancelar
                        </button>
                        <button
                        onClick={handleSubmit}
                        disabled={!comment.trim()}
                        className="flex gap-2 items-center bg-[var(--primary)] text-[var(--secondary)] rounded-md px-4 py-2 w-fit hover:brightness-110 transition font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            <FiSend />
                            Comentar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
