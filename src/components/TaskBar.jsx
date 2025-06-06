export default function TaskBar () {
    return (
        <>
            <div className="absolute inset-x-0 bottom-0 h-1/24 bg-green-600 text-center">
                Task Bar
                <div className="absolute bottom-0 left-0 h-10 w-1/16 bg-green-800">
                    START
                </div>
                <div className="absolute bottom-0 right-0 h-10 w-1/16 bg-green-400">
                    TIME
                </div>
            </div>
        </>
    )
}