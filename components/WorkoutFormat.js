import React from "react";

const WorkoutFormat = ({ workoutArray }) => {
  return (
    // <table className="table-auto w-full text-left">
    <table className="mx-auto border-2 mt-20 text-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2">Day</th>
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2">Exercise Name</th>
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2">Sets</th>
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2">Reps</th>
          <th className="pb-4 text-2xl leading-6 font-semibold pt-2">Instructions</th>
        </tr>
      </thead>
      <tbody>
        {workoutArray.map((day, index) => (
          <>
            {day.Exercises.map((exercise, idx) => {
              const instructions = exercise.Instructions.split(".");
              return (
                <tr key={idx}>
                  {idx === 0 && (
                    <td className="border px-4 py-2 font-bold" rowSpan={day.Exercises.length}>
                      {day.Day}
                    </td>
                  )}
                  <td className="border px-4 py-2 pr-20">{exercise.Name}</td>
                  <td className="border px-4 py-2 pr-20">{exercise.sets}</td>
                  <td className="border px-4 py-2 pr-20">{exercise.reps}</td>
                  <td className="border px-4 py-2">
                    <ol>
                      {instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ol>
                  </td>
                </tr>
              );
            })}
          </>
        ))}
      </tbody>
    </table>


  );
}

export default WorkoutFormat;