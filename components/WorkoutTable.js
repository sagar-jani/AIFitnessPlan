import React from 'react';

const WorkoutTable = ({ workoutArray }) => {
  console.log('workoutArray', workoutArray)
  return (
    <table className="mx-auto border-2 mt-20 ">
      <thead>
        <tr>
          <th className="pb-4 text-2xl leading-6 font-semibold text-gray-900 ">No</th>
          <th className="pb-4 text-2xl leading-6 font-semibold text-gray-900 ">Workout</th>
          <th className="pb-4 text-2xl leading-6 font-semibold text-gray-900 ">Sets</th>
          <th className="pb-4 text-2xl leading-6 font-semibold text-gray-900 ">Reps</th>
        </tr>
      </thead>
      <tbody>
        {workoutArray.map((day, dayIndex) => (
          <React.Fragment key={dayIndex}>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-md font-medium uppercase tracking-wide text-white transform">
              <td className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-md font-medium uppercase tracking-wide text-white transform" colSpan={4}>
                {day.day}
              </td>
            </tr>
            {day.exercises.map((exercise, exerciseIndex) => (
              <tr key={exerciseIndex} className="hover:bg-gray-200 ">
                <td className="px-10 py-3">{exercise.no}</td>
                <td className="px-16 py-3">{exercise.workout}</td>
                <td className="px-10 py-3">{exercise.sets}</td>
                <td className="px-8 py-3">{exercise.reps}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default WorkoutTable;
