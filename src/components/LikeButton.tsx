import React from 'react';

interface LikeButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isActive: boolean;
}

//кнопка лайка
const LikeButton: React.FC<LikeButtonProps> = ({ onClick, isActive }) => {
    return (
        <button
            onClick={onClick}
            className={
                isActive
                    ? 'rounded-md border p-2 text-red-500 hover:text-red-800 focus:outline-none focus:ring-4 focus:ring-red-300'
                    : 'rounded-md border p-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300'
            }
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
            </svg>
        </button>
    );
};

export default LikeButton;
