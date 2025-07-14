
export default function Icons ({icon_name, clickReference}) {
    return  (
        <>
            {/* onClick on div receives onclick reference (clickReference) from React  */}
            <div onClick={clickReference} className="w-15 h-15 m-2 bg-white text-red-500 cursor-pointer">
                {icon_name}
            </div>
        </>
    );
}