import React from 'react'

const CourseCard = ({level,name,title}) => {
    return (
        <div className="bg-gradient-to-r from-red to-blue p-4 rounded-lg drop-shadow-lg">
            <div className="flex flex-col">
                <p>{level}</p>
                <p>{name}</p>
                <p>{title}</p>
            </div>
            
        </div>
    )
}

export default CourseCard
