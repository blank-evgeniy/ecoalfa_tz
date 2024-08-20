import React, { useState } from 'react';
import Item from '../types/Item';
import { Link } from 'react-router-dom';

import { storeSlice } from '../store/reducers/storeSlice';
import { useAppDispatch } from '../hooks/reduxHooks';

interface CardProps {
    data: Item;
    favorite: boolean;
}

const Card: React.FC<CardProps> = ({ data, favorite }) => {
    const [isFavorite, setIsFavorite] = useState(favorite);

    const { addFavorite, removeFavorite, deleteItem } = storeSlice.actions;
    const dispatch = useAppDispatch();

    const handleToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (isFavorite) {
            dispatch(removeFavorite(data.id));
            setIsFavorite((prev) => !prev);
        } else {
            dispatch(addFavorite(data.id));
            setIsFavorite((prev) => !prev);
        }
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(deleteItem(data.id));
    };

    return (
        <div className="mx-auto w-full max-w-[280px] rounded-lg border border-gray-200 bg-white shadow">
            <Link to={`/${data.id}`}>
                <img
                    className="mx-auto h-[300px] object-contain"
                    src={data.image}
                    alt="product image"
                />

                <div className="px-5 pb-5">
                    <div className="line-clamp-5">
                        <h5 className="text-md font-semibold tracking-tight text-gray-900">
                            {data.title}
                        </h5>
                        <p className="text-md text-gray-900">
                            {data.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <span className="text-3xl font-bold text-gray-900">
                            ${data.price}
                        </span>
                        <button
                            onClick={handleDelete}
                            className="rounded-md border p-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </button>
                        <button
                            onClick={handleToFavorite}
                            className={
                                isFavorite
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
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;
