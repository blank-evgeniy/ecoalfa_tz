import { Link, useNavigate, useParams } from 'react-router-dom';
import { storeApi } from '../store/reducers/storeApi';
import { useEffect, useState } from 'react';
import { storeSlice } from '../store/reducers/storeSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';

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
                                <DeleteButton onClick={handleDelete} />
                                <LikeButton
                                    onClick={handleToFavorite}
                                    isActive={isFavorite}
                                />
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
