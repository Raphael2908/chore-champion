'use client'

import { useState } from "react"

export default function ChoreFilter({chores, kids}){
    const [currentChild, setCurrentChild] = useState(kids[0].full_name)
    const doneChores = chores.filter((chore) => chore.chore_status == true && chore.profiles.full_name == currentChild)
    const notDoneChores = chores.filter((chore) => chore.chore_status == false && chore.profiles.full_name == currentChild)
    return (
        <div className="flex flex-col gap-5">
        <div className="relative inline-block w-full">
                <select
                    name="chore filter"
                    id="choreFilter"
                    onChange={(e) => setCurrentChild(e.target.value)}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="" disabled> Select Kid</option>
                    {
                        kids.map(kid => (
                            <option key={kid.full_name} value={kid.full_name}>{kid.full_name}</option>
                        ))
                    }
                </select>

        </div>

            {/* Chores done */}
            <h1>Chores Not Done 😡</h1>
            <div className='bg-white rounded-md p-3'>
                {
                    notDoneChores.map((chores) => {
                        return (
                            <div key={chores.id}>
                                
                                <h1>{chores.chore_name}</h1>
                            </div>
                        )
                    })
                }
            </div>
            
            {/* chores not done */}
            <h1>Chores completed 😃</h1>
            <div className="bg-white rounded-md p-3">
                {
                    doneChores.map((chores) => {
                        return (
                            <div key={chores.id}>
                                <h1>{chores.chore_name}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}