import React, { useState } from 'react';
import Item from '../types/Item';
import { Link } from 'react-router-dom';

import { storeSlice } from '../store/reducers/storeSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

interface CardProps {
    data: Item;
    favorite: boolean;
}

const Card: React.FC<CardProps> = ({ data, favorite }) => {
    const [isFavorite, setIsFavorite] = useState(favorite);

    const { addFavorite, removeFavorite, deleteItem } = storeSlice.actions;
    const dispatch = useAppDispatch();

    const handleToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        //отменяем переход по ссылке(вся карточка ссылка)
        event.preventDefault();
        event.stopPropagation();

        //в зависимости от значения лайка удаляем/добавляем товар в избранные
        if (isFavorite) {
            dispatch(removeFavorite(data.id));
            setIsFavorite((prev) => !prev);
        } else {
            dispatch(addFavorite(data.id));
            setIsFavorite((prev) => !prev);
        }
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        //отменяем переход по ссылке(вся карточка ссылка)
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
                        <DeleteButton onClick={(e) => handleDelete(e)} />
                        <LikeButton
                            onClick={(e) => {
                                handleToFavorite(e);
                            }}
                            isActive={isFavorite}
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;
