import { useState } from 'react';
import './App.css';
import useGetIpInfo from '../lib/getIpInfo';
import { ipInfoI } from '../resources/interface';
import iconArrow from '../resources/assets/icon-arrow.svg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

function App() {
	const [input, setInput] = useState('');
	const [ipValue, setIpValue] = useState('');
	const [location, setLocation] = useState<LatLngExpression>([
		50.1109221, 8.6821267,
	]);

	const ipInfo: ipInfoI | undefined = useGetIpInfo(ipValue);

	const handleSubmit = () => {
		setIpValue(input);
		ipInfo && setLocation([ipInfo?.latitude, ipInfo?.longitude]);
	};

	return (
		<main className="main">
			<div className="section">
				<header></header>
				<div className="map">
					{ipInfo && (
						<MapContainer center={location} zoom={6} scrollWheelZoom={true}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={location}>
								<Popup></Popup>
							</Marker>
						</MapContainer>
					)}
				</div>
			</div>
			<div className="details-wrapper">
				<div className="details">
					<h1>IP Address Tracker</h1>
					<div className="input-wrapper">
						<input
							type="text"
							value={input}
							placeholder="Search for any IP address or domain"
							onChange={(e) => setInput(e.target.value)}
						/>
						<button onClick={handleSubmit}>
							<img src={iconArrow} alt="arrow" />
						</button>
					</div>
					<div className="info-wrapper">
						<div className="info">
							<span>ip address</span>
							<p>{ipInfo?.ip}</p>
						</div>
						<div className="info">
							<span>Location</span>
							<p>
								{ipInfo?.city}, {ipInfo?.region}
							</p>
						</div>
						<div className="info">
							<span>timezone</span>
							<p>
								{ipInfo?.timezone_name}
								{ipInfo?.timezone_gmt}
							</p>
						</div>
						<div className="info">
							<span>isp</span>
							<p>{ipInfo?.isp}</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
