import { Link, useNavigate, useParams } from 'react-router-dom';
import { storeApi } from '../store/reducers/storeApi';
import { useEffect, useState } from 'react';
import { storeSlice } from '../store/reducers/storeSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const ItemPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isFavorite, setIsFavorite] = useState(false);

    const { favorites, deleted } = useAppSelector((state) => state.store);
    const { addFavorite, removeFavorite, deleteItem } = storeSlice.actions;
    const dispatch = useAppDispatch();

    const { data, error, isLoading } = storeApi.useFetchItemByIdQuery(
        Number(id!)
    );

    useEffect(() => {
        if (data) setIsFavorite(favorites.includes(data.id));
    }, [favorites, data]);

    const handleToFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(data!.id));
        } else {
            dispatch(addFavorite(data!.id));
        }
    };

    const handleDelete = () => {
        dispatch(deleteItem(data!.id));
        navigate('/');
    };

    if (isLoading) return <div className="mx-auto max-w-[1200px]">Loading</div>;

    if (error) return <div className="mx-auto max-w-[1200px]">Error</div>;

    return (
        <div className="mx-auto max-w-[1200px] pt-8">
            <Link
                to="/"
                className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
                back to catalog
            </Link>
            {data && !deleted.includes(data.id) ? (
                <>
                    <div className="block gap-4 pt-8 sm:flex">
                        <img
                            className="max-h-[500px] rounded-xl object-contain shadow-lg"
                            src={data?.image}
                        />
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold">
                                    {data.title}
                                </h1>
                                <p>{data.description}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${data.price}
                                </span>
                                <button className="rounded-md border p-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300">
                                    <svg
                                        onClick={handleDelete}
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
                                    className={
                                        isFavorite
                                            ? 'rounded-md border p-2 text-red-500 hover:text-red-800 focus:outline-none focus:ring-4 focus:ring-red-300'
                                            : 'rounded-md border p-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300'
                                    }
                                >
                                    <svg
                                        onClick={handleToFavorite}
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
                    </div>
                </>
            ) : (
                <div className="pt-8">Item not found</div>
            )}
        </div>
    );
};

export default ItemPage;
