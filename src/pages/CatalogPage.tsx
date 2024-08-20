import { useState } from 'react';
import Card from '../components/Card';
import { useAppSelector } from '../hooks/reduxHooks';
import { storeApi } from '../store/reducers/storeApi';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

//лимит на получение данных с сервера
const ITEMS_LIMIT = 20;

const CatalogPage = () => {
    const { favorites, deleted } = useAppSelector((state) => state.store);

    const [isLikeFilter, setIsLikeFilter] = useState(false);

    const { data, error, isLoading } =
        storeApi.useFetchAllItemsQuery(ITEMS_LIMIT);

    //фильтруем полученные товары, скрывая удаленные и при
    //активном фильтре показывая только товары с лайком
    const filteredData = !isLikeFilter
        ? data?.filter((item) => !deleted.includes(item.id))
        : data?.filter(
              (item) =>
                  !deleted.includes(item.id) && favorites.includes(item.id)
          );

    const handleClickFilter = () => {
        setIsLikeFilter((prev) => !prev);
    };

    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage />;

    return (
        <div className="mx-auto max-w-[1200px]">
            <div className="flex items-center justify-center py-8">
                <button
                    onClick={handleClickFilter}
                    className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                    {isLikeFilter ? 'Show all' : 'Show only liked'}
                </button>
            </div>
            {filteredData && filteredData.length > 0 ? (
                <div className="block gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredData.map((item) => (
                        <Card
                            key={item.id}
                            data={item}
                            favorite={favorites.includes(item.id)}
                        />
                    ))}
                </div>
            ) : (
                <div>Items not found</div>
            )}
        </div>
    );
};

export default CatalogPage;
