//сообщение об ошибке
const ErrorMessage = () => {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-2xl">
                <span className="text-red-600">Oops!</span> An unexpected error
                has occurred.
            </div>
        </div>
    );
};

export default ErrorMessage;
