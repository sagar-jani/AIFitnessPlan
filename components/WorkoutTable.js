import React from 'react';

const WorkoutTable = ({ workoutArray }) => {
  console.log('workoutArray', workoutArray)
  return (
    <table className="mx-auto border-2 mt-20 text-white">
      <thead >
        <tr >
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2 ">No</th>
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2 ">Workout</th>
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2 ">Sets</th>
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2 ">Reps</th>
        </tr>
      </thead>
      <tbody>
        {workoutArray.map((day, dayIndex) => (
          <React.Fragment key={dayIndex}>
            <tr className="text-center bg-primary rounded text-md  uppercase  text-white transform font-bold">
              <td className="font-bold py-2  text-md font-medium uppercase  text-white transform" colSpan={4}>
                {day.day}
              </td>
            </tr>
            {day.exercises.map((exercise, exerciseIndex) => (
              <tr key={exerciseIndex} className="hover:bg-black ">
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
