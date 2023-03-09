import React from 'react';

const WorkoutPlan = ({ plan }) => {
  const workoutPlan = JSON.parse(plan)
  return (
    <table className="w-2/3 mx-auto text-center mt-20">
      <thead>
        <tr>
          <th className="px-4 py-2 text-2xl text-blue-600">Day</th>
          <th className=" py-2 text-2xl text-blue-600">Exercise Name</th>
          <th className="px-4 py-2 text-2xl text-blue-600">Sets</th>
          <th className="px-4 py-2 text-2xl text-blue-600">Reps</th>
        </tr>
      </thead>
      <tbody>
        {workoutPlan.map(({ Day, Exercises }) => (
          <React.Fragment key={Day}>
            <tr>
              <td className="border px-4 py-2 text-xl" rowSpan={Exercises.length + 1}>{Day}</td>
            </tr>
            {Exercises.map(({ Name, sets, reps }) => (
              <tr key={Name}>
                <td className="border py-2 text-xl">{Name}</td>
                <td className="border py-2 text-xl">{sets}</td>
                <td className="border  py-2 text-xl">{reps}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
};

export default WorkoutPlan;
