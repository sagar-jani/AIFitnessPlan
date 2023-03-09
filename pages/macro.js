import Head from "next/head"
import React from "react"
import MacroRecipe from "../components/MacroRecipe"



const Macro = () => {
  return (
    <>
      <Head>
        <title>Macro Planner - Generate Meal !</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <MacroRecipe />
    </>
  )
}

export default Macro