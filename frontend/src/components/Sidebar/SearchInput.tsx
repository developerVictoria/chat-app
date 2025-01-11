
import { GoSearch } from "react-icons/go";

function SearchInput() {
    return (
        <form className='flex items-center gap-2'>
            <input type="text" placeholder="search_" className='input input-bordered rounded-full' />
            <button type='submit' className='btn btn-circle bg-indigo-400 text-white' >
                <GoSearch className='w-5 h-5 outline-none' />
            </button>
        </form>
    )
}

export default SearchInput