export default function TaskBar () {
    return (
        <>
            <div className="z-40 absolute inset-x-0 bottom-0 md:h-1/24 bg-blue-400 text-center border-2 border-black ">
                Task Bar
                <div className="absolute bottom-0 left-0 h-full w-1/16 bg-green-800 border-r-2 border-black">
                    START
                </div>
                <div className="absolute bottom-0 right-0 h-full w-1/16 bg-green-400 border-l-2 border-black">
                    TIME
                </div>
            </div>
        </>
    )
}