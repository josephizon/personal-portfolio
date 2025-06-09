
export default function Icons ({icon_name, onclick}) {
    return  (
        <>
            {/* onClick on div receives onclick from React || its onclick because react is spelled onclick */}
            <div onClick={onclick} className="w-15 h-15 m-2 bg-white text-red-500">
                {icon_name}
            </div>
        </>
    );
}