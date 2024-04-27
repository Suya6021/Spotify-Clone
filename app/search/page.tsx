import getSongsByTitle from '@/action/getSongByTitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import React from 'react'
import SearchContent from './components/SearchContent';
interface SearchProps{
    searchParams:{
        title:string;
    }
}
export const revalidate=0;
const Search =async ({searchParams}:SearchProps)=> {
    const SongsBytitle=await getSongsByTitle(searchParams.title);
  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header className='from-bg-bg-neutral-900' >
        <div className='text-white text-3xl font-semibold'>
            <h1>
                Search
            </h1>
             <SearchInput/>
        </div>
      </Header>
      <SearchContent songs={SongsBytitle}/>
    </div>
  )
}

export default Search
