import React, { useState, useEffect } from "react";
import {
	FormControl,
	Select,
	MenuItem,
	Card,
	CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData, prettyPrintStat } from "./util";
import "./App.css";
import "leaflet/dist/leaflet.css";
import SymptomsCard from "./SymptomsCard.js";
import StatesTable from "./StatesTable";

function App() {
	const [countries, setCountries] = useState([]); // For getting all countries in the dropdown
	const [country, setCountry] = useState("worldwide"); // Remebering the countries
	const [tableData, setTableData] = useState([]);
	const [countryInfo, setCountryInfo] = useState({});
	const [mapCenter, setMapCenter] = useState({
		lat: 34.80746,
		lng: -40.4796,
	});
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");
	const [USStates, setUSStates] = useState([]);
	const [indianStates, setIndianStates] = useState([]);

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		//  Getting DATA from an URL
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					const sortedData = sortData(data);
					setTableData(sortedData);
					setMapCountries(data);
					setCountries(countries);
				});
		};

		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		console.log(countryCode);
		setCountry(countryCode);
		const url =
			countryCode === "worldwide"
				? "​https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true&allowNull=true`;

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);

				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			});
	};
	useEffect(() => {
		const getUSStatesData = () => {
			fetch("https://disease.sh/v3/covid-19/states?sort=cases")
				.then((response) => response.json())
				.then((data) => {
					const USstates = data.map((state) => ({
						name: state.state,
						cases: state.cases,
					}));

					setUSStates(USstates);
				});
		};

		getUSStatesData();
	}, []);

	useEffect(() => {
		const getIndianStatesData = () => {
			fetch("https://disease.sh/v3/covid-19/gov/India?allowNull=0")
				.then((res) => res.json())
				.then(({ states }) => {
					const editedStates = states.map((state) => ({
						name: state.state,
						cases: state.cases,
					}));
					const sortedData = sortData(editedStates);
					console.log(sortedData);
					setIndianStates(sortedData);
				});
		};

		getIndianStatesData();
	}, []);

	return (
		<div className="app">
			<div className="app__up">
				<div className="app__left">
					<div className="app__header">
						<h1> COVID-19 Tracker</h1>

						<FormControl className="app__dropdown">
							<Select
								variant="outlined"
								value={country}
								onChange={onCountryChange}
							>
								<MenuItem value="worldwide"> Worldwide </MenuItem>
								{countries.map((country) => (
									<MenuItem value={country.value}>
										{" "}
										{country.name}{" "}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div className="app__stats">
						<InfoBox
							isRed
							active={casesType === "cases"}
							onClick={() => setCasesType("cases")}
							title="Coronavirus Cases"
							total={prettyPrintStat(countryInfo.cases)}
							cases={prettyPrintStat(countryInfo.todayCases)}
						/>
						<InfoBox
							active={casesType === "recovered"}
							onClick={() => setCasesType("recovered")}
							title="Recovered"
							total={prettyPrintStat(countryInfo.recovered)}
							cases={prettyPrintStat(countryInfo.todayRecovered)}
						/>
						<InfoBox
							isRed
							active={casesType === "deaths"}
							onClick={() => setCasesType("deaths")}
							title="Deaths"
							total={prettyPrintStat(countryInfo.deaths)}
							cases={prettyPrintStat(countryInfo.todayDeaths)}
						/>
					</div>

					<Map
						casesType={casesType}
						countries={mapCountries}
						center={mapCenter}
						zoom={mapZoom}
					/>
				</div>

				<Card className="app__right">
					<CardContent>
						{/* Table */}
						<h3> Live Cases by Country</h3>
						<Table countries={tableData} />

						{/* GRAPH */}
						<h3 className="app__graphTitle"> Worldwide {casesType}</h3>
						<LineGraph className="app__graph" casesType={casesType} />
					</CardContent>
				</Card>
			</div>

			<div className="app__down">
				<StatesTable states={indianStates} countryAdjective="Indian" />
				<StatesTable states={USStates} countryAdjective="USA" />
				<SymptomsCard className="app__symptomsCard" />
			</div>
		</div>
	);
}
export default App;
