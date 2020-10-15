import React from "react";
import numeral from "numeral";
import "./StatesTable.css";
import { Card, CardContent } from "@material-ui/core";

function StatesTable({ states, countryAdjective }) {
	return (
		<Card className="app__statesCard">
			<h2> Cases in Each {countryAdjective} State </h2>
			<CardContent className="app__statesData">
				<table className="statesTable">
					{states.map(({ name, cases }) => (
						<tr>
							<td> {name} </td>
							<td>
								<strong>{numeral(cases).format("0,0")}</strong>
							</td>
						</tr>
					))}
				</table>
			</CardContent>
		</Card>
		// <Card className="app__statesCard">
		//
		// <CardContent className="app__statesData">
		// 	<StatesTable states={states} />
		// </CardContent>
	);
}

export default StatesTable;
