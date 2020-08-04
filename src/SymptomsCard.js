import React from "react";
import { Card, CardContent } from "@material-ui/core"

function SymptomsCard() {
   return (
      <Card className="symptomsCard">
         <CardContent className="symptomsCard__left">
            <h1>Symptoms</h1>
            <br />
            <ul>
               <li> <h3> Most Common Cases</h3> </li>
               <ul>
                  <li>Fever</li>
                  <li>Dry cough</li>
                  <li>Tiredness</li>
               </ul>
               <br />

               <li><h3> Less Common Cases</h3></li>
               <ul>
                  <li>Aches and pains</li>
                  <li>Sore throat</li>
                  <li>Diarrhoea</li>
                  <li>Conjunctivitis</li>
                  <li>Headache</li>
                  <li>Loss of taste or smell</li>
                  <li>A rash on skin, or discolouration of fingers or toes</li>
               </ul>
               <br />

               <li><h3> Serious Common Cases</h3></li>
               <ul>
                  <li>Difficulty breathing or shortness of breath</li>
                  <li>Chest pain or pressure</li>
                  <li>Loss of speech or movement</li>
               </ul>
            </ul>
         </CardContent>
      </Card>
   );
}

export default SymptomsCard;
