export default function LoginScreen ({clickClose}) {
    return (
        <>

            <div className="relative z-50 w-screen h-screen bg-yellow-300 border-black border-2">
                <div className="absolute inset-x-0 top-0 h-1/8 bg-yellow-400 border-black border-b-2"> 
                    
                </div> 

                {/* Centered text */}
                <div className="flex flex-row items-center justify-center h-full">
                    
                <div className="flex flex-col ">
                    <p className="font-sora text-black font-bold text-right">&lt;Hello World/&gt; </p>
                    <p className="text-center text-xs">To begin, click my username!</p>
                </div>

                <div className="flex flex-row"> 
                    <p className="pr-6"> </p>
                    <div className="h-[250px] min-h-[1em] w-px self-stretch bg-black"></div>
                    <p className="pl-6"> </p>
                </div>

                <div className="flex flex-col">
                    <div onClick={clickClose} className="w-10 h-10 bg-black"></div>
                    <p className="text-left">Hello! I am Joseph Izon</p>
                </div>
                </div>


                <div className="absolute inset-x-0 bottom-0 h-1/8 bg-yellow-400 border-black border-t-2"> 
                    
                </div> 
        
            </div>
    
        </>
    
    ) // end of return
}